import { PrimeNgModule } from './../../../shared/primeng.module';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Role } from 'src/app/shared/interfaces/role.interface';
import { BusVehicleService } from '../service/bus-vehicle.service';
import { BusVehicle } from 'src/app/shared/interfaces/bus-vehicle.interface';

@Component({
  standalone: true,
  selector: 'app-bus-vehicle-list',
  imports: [
    PrimeNgModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService],
  template: `
  <div class="mb-2">
  <p-accordion [activeIndex]="0">
    <p-accordionTab header="ค้นหารายการรถเมล์">
       <div class="flex flex-wrap gap-3 mb-2">
        <div class="flex-auto">
            <label for="integer" class="font-bold block mb-2"> เลขทะเบียนรถ </label>
            <input (input)="datatableVehicle.filter(getDataInput($event),'busVehiclePlateNo' , 'contains')"  pInputText id="integer" class="w-full" />
        </div>
        <div class="flex-auto">
            <label for="number" class="font-bold block mb-2"> เลขข้างรถ </label>
            <input (input)="datatableVehicle.filter(getDataInput($event),'busVehicleNumber' , 'contains')"  pInputText id="integer" class="w-full" pInputText class="w-full" />
        </div>
        <div class="flex-auto">
            <label for="money" class="font-bold block mb-2"> สายรถเมล์ </label>
            <input (input)="datatableVehicle.filter(getDataInput($event),'busLinesNo' , 'contains')"  pInputText id="integer" class="w-full" pInputText  class="w-full" />
        </div>
          <div class="flex-auto">
            <label for="money" class="font-bold block mb-2"> 	ประเภทรถเมล์ </label>
            <input (input)="datatableVehicle.filter(getDataInput($event),'typeName' , 'contains')"  pInputText id="integer" class="w-full" pInputText  class="w-full" />
        </div>
          <div class="flex-auto">
            <label for="money" class="font-bold block mb-2"> กองปฏิบัติการเดินรถ </label>
            <input (input)="datatableVehicle.filter(getDataInput($event),'busDivisionName' , 'contains')"  pInputText id="integer" class="w-full" pInputText  class="w-full" />
        </div>
    </div>
    </p-accordionTab>
 </p-accordion>
  </div>
   <p-accordion [activeIndex]="0">
    <p-accordionTab header="รายการรถเมล์">
         <div class="flex justify-content-between mb-3">
        <h3></h3>
        <p-button
          icon="pi pi-plus"
          label="เพิ่มรถเมล์"
          styleClass="p-button-success p-button-sm"
        ></p-button>
      </div>
        <p-table
        #datatableVehicle
        [value]="dataTable"
        [paginator]="true"
        [rows]="10"
        [showCurrentPageReport]="true"
        currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords} ทั้งหมดรายการ"
        [rowsPerPageOptions]="[10, 25, 50]">
        <ng-template pTemplate="header">
            <tr>
                <th style="text-align: center;min-width: 60px;">ลำดับที่</th>
                <th>เลขทะเบียนรถ</th>
                <th>จังหวัด</th>
                <th>เลขข้างรถ</th>
                <th>สายรถเมล์</th>
                <th>ประเภทรถเมล์</th>
                <th>กองปฏิบัติการเดินรถ</th>
                <th>จัดการ</th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-data let-i="rowIndex">
            <tr>
                <td style="text-align: center;">{{ i+1 }}</td>
                <td>{{ data.busVehiclePlateNo ?? '-'  }}</td>
                <td>{{ data.busVehiclePlateProv ?? '-'  }}</td>
                <td>{{ data.busVehicleNumber ?? '-'  }}</td>
                <td>{{ data.busLinesNo ?? '-'  }}</td>
                <td>{{ data.typeName ?? '-'  }}</td>
                <td>{{ data.busDivisionName ?? '-'  }}</td>
               <td>
                  <p-button icon="pi pi-search"  styleClass="mr-2"></p-button>
                  <p-button icon="pi pi-file-edit"  styleClass="p-button-warning mr-2"></p-button>
                  <p-button icon="pi pi-trash"  styleClass="p-button-danger"></p-button>
              </td>
            </tr>
        </ng-template>
    </p-table>
    </p-accordionTab>
 </p-accordion>
  
`
})
export class BusVehicleListComponent implements OnInit {
  private _service = inject(BusVehicleService);
  private _changeDetectorRef = inject(ChangeDetectorRef);

  dataTable: BusVehicle[] = [];
  sidebarVisible2: boolean = false;
  constructor() { }

  ngOnInit() {
    this.getRole()
  }

  getDataInput(data: any) {
    return data.target.value
  }


  getRole() {
    this._service.getBusVehicleList().subscribe({
      next: (response: any) => {
        const data: any = response;
        this.dataTable = data['data']
        this._changeDetectorRef.markForCheck()
      },
      error: (err) => {

      }
    });
  }

}
