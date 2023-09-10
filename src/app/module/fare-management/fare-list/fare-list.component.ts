import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { BusLines } from 'src/app/shared/interfaces/bus-lines.interface';
import { Fare } from 'src/app/shared/interfaces/fare.interface';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { ToastService } from 'src/app/shared/services/toast.service';
import { SharedAppModule } from 'src/app/shared/shared-app.module';
import { FareService } from '../service/fare.service';

@Component({
  standalone: true,
  selector: 'app-fare-list',
  imports: [PrimeNgModule, SharedAppModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './fare-list.component.html'
})

export class FareListComponent implements OnInit {
  private _service = inject(FareService);
  private _changeDetectorRef = inject(ChangeDetectorRef);
  private _toastService = inject(ToastService);
  searchText!: string | null;
  dataTable: Fare[] = [];
  registerForm!: FormGroup;
  submittedForm$ = new BehaviorSubject<boolean>(false);
  sidebar: boolean = false;
  constructor(private fb: FormBuilder) { }


  ngOnInit() {
    this.search()
    this.createForm()
  }
  createForm(): void {
    this.registerForm = this.fb.group({
      fareId: new FormControl<number | null>(null),
      fareValue: new FormControl<number | null>(null, Validators.required),
      fareDesc: new FormControl<string | null>(null),
    });
  }

  search() {
    this._service.search().subscribe({
      next: (response: any) => {
        const data: any = response;
        this.dataTable = data['data']
        this._changeDetectorRef.markForCheck()
      },
      error: (err) => {

      }
    });
  }
  getDataInput(data: any) {
    return data.target.value
  }

  openSidebar(): void {
    this.sidebar = true;
  }

  onCloseAction(): void {
    this.sidebar = false;
  }


  isFieldValid(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!control?.invalid && (!!control?.touched || (!!control?.untouched && this.submittedForm$.value));
  }

  private handleInvalidForm(): void {
    this.submittedForm$.next(true);
    this._toastService.addSingle('warn', 'แจ้งเตือน', 'โปรดกรอกข้อมูลให้ครบถ้วน!');
  }




  validateForm(): void {
    if (this.registerForm.invalid) {
      this.handleInvalidForm();
      return;
    }

    this.submittedForm$.next(false);
    this.save()
  }

  save(): void {
    if (this.registerForm.valid) {
      this._service.save(this.registerForm.value).subscribe({
        next: (response: any) => {
          const data: any = response;
          this.handleSaveSuccess();
        },
        error: (err) => {

        }
      });
    }
  }

  private handleSaveSuccess(): void {
    this.onCloseAction();
    this.search();
    this._toastService.addSingle('success', 'แจ้งเตือน', 'บันทึกข้อมูลสำเร็จ');
  }


}
