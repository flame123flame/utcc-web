import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PrimeNgModule } from 'src/app/shared/primeng.module';

@Component({
  standalone:true,
  selector: 'app-bus-terminal-list',
  imports: [PrimeNgModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<p-card header="">
  <div class="flex justify-content-between mb-3">
    <h2>รายการท่ารถเมล์</h2>
    <p-button

      icon="pi pi-plus"
      label="เพิ่มท่ารถเมล์"
      styleClass="p-button-success p-button-sm"
    ></p-button>
  </div>
    <p-table
    [value]="[]"
    [paginator]="true"
    [rows]="10"
    [showCurrentPageReport]="true"
    currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords} ทั้งหมดรายการ"
    [rowsPerPageOptions]="[10, 25, 50]">
    <ng-template pTemplate="header">
        <tr>
            <th>ลำดับที่</th>
            <th>ชื่อท่ารถ</th>
            <th>วันที่สร้าง</th>
            <th>จัดการ</th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-data let-i="rowIndex">
        <tr>
            <td>{{ i+1 }}</td>
            <td>{{ data.busVehiclePlateNo ?? '-'  }}</td>
            <td>{{ data.busVehiclePlateProv ?? '-'  }}</td>
           <td>
              <p-button icon="pi pi-search"  styleClass="mr-2"></p-button>
              <p-button icon="pi pi-file-edit"  styleClass="p-button-warning mr-2"></p-button>
              <p-button icon="pi pi-trash"  styleClass="p-button-danger"></p-button>
             </td>
        </tr>
    </ng-template>
</p-table>
</p-card>`,
})
export class BusTerminalListComponent {

}
