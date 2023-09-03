import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { BusDepot } from 'src/app/shared/interfaces/bus-depot.interface';
import { BusDivision } from 'src/app/shared/interfaces/bus-division.interface';
import { Fare } from 'src/app/shared/interfaces/fare.interface';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { ToastService } from 'src/app/shared/services/toast.service';
import { SharedAppModule } from 'src/app/shared/shared-app.module';
import { BusDepotService } from '../../bus-depot-management/service/bus-depot.service';
import { BusDivisionService } from '../service/bus-division.service';

@Component({
  standalone: true,
  selector: 'app-bus-division-list',
  imports: [PrimeNgModule, SharedAppModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bus-division-list.component.html',
})

export class BusDivisionListComponent implements OnInit {
  private _service = inject(BusDivisionService);
  private _serviceBusDepotService = inject(BusDepotService);
  private _changeDetectorRef = inject(ChangeDetectorRef);
  private _toastService = inject(ToastService);

  registerForm!: FormGroup;
  searchText!: string | null;
  dataTable: BusDivision[] = [];
  sidebar: boolean = false;
  dataDropdownBusDepot: BusDepot[] = [];
  submittedForm$ = new BehaviorSubject<boolean>(false);
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.search()
    this.searchDropdownBusDepot()
    this.createForm()
  }

  searchDropdownBusDepot() {
    this._serviceBusDepotService.search().subscribe({
      next: (response: any) => {
        const data: any = response;
        this.dataDropdownBusDepot = data['data']
        this._changeDetectorRef.markForCheck()
      },
      error: (err) => {

      }
    });
  }


  search() {
    this._service.search().subscribe({
      next: (response: any) => {
        const data: any = response;
        this.dataTable = data['data']
        this._changeDetectorRef.markForCheck()
        this.registerForm.reset()
      },
      error: (err) => {

      }
    });
  }

  createForm(): void {
    this.registerForm = this.fb.group({
      busDivisionId: new FormControl<number | null>(null),
      busDivisionNo: new FormControl<number | null>(null, Validators.required),
      busDivisionName: new FormControl<string | null>(null, Validators.required),
      bmtaZone: new FormControl<number | null>(null, Validators.required),
      busDepotId: new FormControl<number | null>(null, Validators.required),
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
