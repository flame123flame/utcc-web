import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { BusDepot } from 'src/app/shared/interfaces/bus-depot.interface';
import { Fare } from 'src/app/shared/interfaces/fare.interface';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { ToastService } from 'src/app/shared/services/toast.service';
import { SharedAppModule } from 'src/app/shared/shared-app.module';
import { BusDepotService } from '../service/bus-depot.service';

@Component({
  standalone: true,
  selector: 'app-bus-depot-list',
  imports: [PrimeNgModule, SharedAppModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bus-depot-list.component.html',
  providers: [ConfirmationService,]
})

export class BusDepotListComponent implements OnInit {
  private _service = inject(BusDepotService);
  private _changeDetectorRef = inject(ChangeDetectorRef);
  private _toastService = inject(ToastService);
  searchText!: string | null;
  dataTable: BusDepot[] = [];
  sidebar: boolean = false;
  registerForm!: FormGroup;
  submittedForm$ = new BehaviorSubject<boolean>(false);
  constructor(private fb: FormBuilder, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit() {
    this.search()
    this.createForm()
  }
  createForm(): void {
    this.registerForm = this.fb.group({
      busDepotId: new FormControl<number | null>(null),
      depotName: new FormControl<string | null>(null, Validators.required),
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



  confirmDelete(busDepot: BusDepot) {
    this.confirmationService.confirm({
      header: 'ยืนยันการลบข้อมูลอู่รถเมล์',
      message: `ต้องการลบข้อมูลอู่รถเมล์ ${busDepot.depotName} ใช่หรือไม่`,
      icon: 'pi pi-trash',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
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
