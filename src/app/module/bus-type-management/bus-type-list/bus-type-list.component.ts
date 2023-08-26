import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { BusType } from 'src/app/shared/interfaces/bus-type.interface';
import { BusVehicle } from 'src/app/shared/interfaces/bus-vehicle.interface';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { BusTypeService } from '../service/bus-type.service';

@Component({
  standalone: true,
  selector: 'app-bus-type-list',
  imports: [PrimeNgModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="mb-2">
  <p-accordion [activeIndex]="0">
    <p-accordionTab header="ค้นหารายการประเภทรถเมล์">
       <div class="flex flex-wrap gap-3 mb-2">
        <div class="flex-auto">
            <label for="integer" class="font-bold block mb-2"> ประเภทรถเมล์ </label>
            <input (input)="datatableBusType.filter(getDataInput($event),'busTypeName' , 'contains')"  pInputText id="integer" class="w-full" />
        </div>
      <div class="flex-auto"></div>
       <div class="flex-auto"></div>
       <div class="flex-auto"></div>
       <div class="flex-auto"></div>
       <div class="flex-auto"></div>
    </div>
    </p-accordionTab>
 </p-accordion>
  </div>
   <p-accordion [activeIndex]="0">
    <p-accordionTab header="รายการประเภทรถเมล์">
         <div class="flex justify-content-between mb-3">
        <h3></h3>
        <p-button
          icon="pi pi-plus"
          label="เพิ่มประเภทรถเมล์"
          styleClass="p-button-success p-button-sm"
        ></p-button>
      </div>
        <p-table
        #datatableBusType
        [value]="dataTable"
        [paginator]="true"
        [rows]="10"
        [showCurrentPageReport]="true"
        currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords} ทั้งหมดรายการ"
        [rowsPerPageOptions]="[10, 25, 50]">
        <ng-template pTemplate="header">
            <tr>
                <th style="text-align: center;min-width: 60px;">ลำดับที่</th>
                <th>ประเภทรถเมล์</th>
                <th>วันที่สร้าง</th>
                <th>จัดการ</th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-data let-i="rowIndex">
            <tr>
                <td style="text-align: center;">{{ i+1 }}</td>
                <td>{{ data.busTypeName ?? '-'  }}</td>
                <td>{{ data.createDate ?? '-'  }}</td>
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
export class BusTypeListComponent implements OnInit {
  private _service = inject(BusTypeService);
  private _changeDetectorRef = inject(ChangeDetectorRef);

  dataTable: BusType[] = [];
  sidebarVisible2: boolean = false;
  constructor() { }

  ngOnInit() {
    this.search()
  }

  getDataInput(data: any) {
    return data.target.value
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

}