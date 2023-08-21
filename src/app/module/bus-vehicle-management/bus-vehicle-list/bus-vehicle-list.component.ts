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
  template: `<p-card header="">
      <div class="flex justify-content-between mb-3">
        <h2>รายการสิทธ์การใช้งาน</h2>
        <p-button

          icon="pi pi-plus"
          label="เพิ่มสิทธ์การใช้งาน"
          styleClass="p-button-success p-button-sm"
        ></p-button>
      </div>
        <p-table
        [value]="dataTable"
        [paginator]="true"
        [rows]="10"
        [showCurrentPageReport]="true"
        currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords} ทั้งหมดรายการ"
        [rowsPerPageOptions]="[10, 25, 50]">
        <ng-template pTemplate="header">
            <tr>
                <th>ลำดับที่</th>
                <th>เลขทะเบียนรถ</th>
                <th>จังหวัด</th>
                <th>เลขข้างรถ</th>
                <th>สายรถเมล์</th>
                <th>ประเภทรถเมล์</th>
                <th>กองปฏิบัติการเดินรถ</th>
                <th>วันที่สร้าง</th>
                <th>จัดการ</th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-data let-i="rowIndex">
            <tr>
                <td>{{ i+1 }}</td>
                <td>{{ data.busVehiclePlateNo ?? '-'  }}</td>
                <td>{{ data.busVehiclePlateProv ?? '-'  }}</td>
                <td>{{ data.busVehicleNumber ?? '-'  }}</td>
                <td>{{ data.busVehicleNumber ?? '-'  }}</td>
                <td>{{ data.busVehicleNumber ?? '-'  }}</td>
                <td>{{ data.busVehicleNumber ?? '-'  }}</td>
                <td>{{ data.createDate ?? '-'  }}</td>
               <td>
                  <p-button icon="pi pi-search"  styleClass="mr-2"></p-button>
                  <p-button icon="pi pi-file-edit"  styleClass="p-button-warning mr-2"></p-button>
                  <p-button icon="pi pi-trash"  styleClass="p-button-danger"></p-button>
                 </td>
            </tr>
        </ng-template>
    </p-table>
    </p-card>
  
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
