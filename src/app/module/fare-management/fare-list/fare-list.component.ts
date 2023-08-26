import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { BusLines } from 'src/app/shared/interfaces/bus-lines.interface';
import { Fare } from 'src/app/shared/interfaces/fare.interface';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { FareService } from '../service/fare.service';

@Component({
  standalone: true,
  selector: 'app-fare-list',
  imports: [PrimeNgModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="mb-2">
  <p-accordion [activeIndex]="0">
    <p-accordionTab header="ค้นหารายการสายรถเมล์">
       <div class="flex flex-wrap gap-3 mb-2">
        <div class="flex-auto">
            <label for="integer" class="font-bold block mb-2"> เลขสายรถเมล์ </label>
            <input (input)="datatableBusLine.filter(getDataInput($event),'busLinesNo' , 'contains')"  pInputText id="integer" class="w-full" />
        </div>
         <div class="flex-auto">
            <label for="integer" class="font-bold block mb-2"> ต้นทาง </label>
            <input (input)="datatableBusLine.filter(getDataInput($event),'busLinesOrigin' , 'contains')"  pInputText id="integer" class="w-full" />
        </div>
         <div class="flex-auto">
            <label for="integer" class="font-bold block mb-2"> ปลายทาง </label>
            <input (input)="datatableBusLine.filter(getDataInput($event),'busLinesDestination' , 'contains')"  pInputText id="integer" class="w-full" />
        </div>
        <div class="flex-auto"></div>
        <div class="flex-auto"></div>
        <div class="flex-auto"></div>
    </div>
    </p-accordionTab>
  </p-accordion>
 </div>
   <p-accordion [activeIndex]="0">
    <p-accordionTab header="รายการสายรถเมล์">
      <div class="flex justify-content-between mb-3">
        <h2></h2>
        <p-button
          icon="pi pi-plus"
          label="เพิ่มสายรถเมล์"
          styleClass="p-button-success p-button-sm"
        ></p-button>
      </div> 
        <p-table
        #datatableBusLine
        [value]="dataTable"
        [paginator]="true"
        [rows]="10"
        [showCurrentPageReport]="true"
        currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords} ทั้งหมดรายการ"
        [rowsPerPageOptions]="[10, 25, 50]">
             <ng-template pTemplate="header">
            <tr>
                <th style="text-align: center;min-width: 60px;">ลำดับที่</th>
                <th>ราคาตั๋วรถเมล์</th>
                <th>วันที่สร้าง</th>
                <th>จัดการ</th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-role let-i="rowIndex">
            <tr>
                <td style="text-align: center;">{{ i + 1 }}</td>
                <td>{{ role.fareDesc ?? '-'  }} </td>
                <td>{{ role.createDate ?? '-'  }}</td>
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

  `,
})

export class FareListComponent implements OnInit {
  private _service = inject(FareService);
  private _changeDetectorRef = inject(ChangeDetectorRef);
  searchText!: string | null;
  dataTable: Fare[] = [];
  sidebarVisible2: boolean = false;
  constructor() { }

  ngOnInit() {
    this.search()
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

}
