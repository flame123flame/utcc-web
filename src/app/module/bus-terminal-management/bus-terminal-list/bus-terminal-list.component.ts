import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { BusTerminal } from 'src/app/shared/interfaces/bus-terminal.interface';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { ToastService } from 'src/app/shared/services/toast.service';
import { SharedAppModule } from 'src/app/shared/shared-app.module';
import { BusTerminalService } from '../service/bus-terminal.service';

@Component({
  standalone: true,
  selector: 'app-bus-terminal-list',
  imports: [PrimeNgModule, SharedAppModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bus-terminal-list.component.html',
})
export class BusTerminalListComponent implements OnInit {
  private _service = inject(BusTerminalService);
  private _changeDetectorRef = inject(ChangeDetectorRef);
  private _toastService = inject(ToastService);
  searchText!: string | null;
  dataTable: BusTerminal[] = [];
  sidebar: boolean = false;
  registerForm!: FormGroup;
  submittedForm$ = new BehaviorSubject<boolean>(false);
  constructor(private fb: FormBuilder) { }



  ngOnInit() {
    this.search()
    this.createForm()
  }
  createForm(): void {
    this.registerForm = this.fb.group({
      busTerminalId: new FormControl<number | null>(null),
      busTerminalName: new FormControl<string | null>(null, Validators.required),
    });
  }
  search() {
    this._service.search().subscribe({
      next: (response: any) => {
        const data: any = response;
        this.dataTable = data['data']
        this.registerForm.reset()
        this._changeDetectorRef.markForCheck()
      },
      error: (err) => {

      }
    });
  }
  getDataInput(data: any) {
    return data.target.value
  }

  isFieldValid(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!control?.invalid && (!!control?.touched || (!!control?.untouched && this.submittedForm$.value));
  }


  openSidebar(): void {
    this.sidebar = true;
  }

  onCloseAction(): void {
    this.sidebar = false;
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

  private handleInvalidForm(): void {
    this.submittedForm$.next(true);
    this._toastService.addSingle('warn', 'แจ้งเตือน', 'โปรดกรอกข้อมูลให้ครบถ้วน!');
  }


}
