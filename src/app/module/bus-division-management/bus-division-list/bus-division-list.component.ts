import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { BusDivision } from 'src/app/shared/interfaces/bus-division.interface';
import { Fare } from 'src/app/shared/interfaces/fare.interface';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { BusDivisionService } from '../service/bus-division.service';

@Component({
  standalone: true,
  selector: 'app-bus-division-list',
  imports: [PrimeNgModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div class="mb-2">
  <p-accordion [activeIndex]="0">
    <p-accordionTab header="ค้นหารายการตั๋วรถเมล์">
       <div class="flex flex-wrap gap-3 mb-2">
        <div class="flex-auto">
            <label for="integer" class="font-bold block mb-2"> เลขกองปฏิบัติการเดินรถ </label>
            <input type="text" (input)="datatableDivision.filter(getDataInput($event),'busDivisionNo' , 'contains')"  pInputText id="integer" class="w-full" />
        </div>
         <div class="flex-auto">
            <label for="integer" class="font-bold block mb-2"> ชื่อกองปฏิบัติการเดินรถ </label>
            <input (input)="datatableDivision.filter(getDataInput($event),'busDivisionName' , 'contains')"  pInputText id="integer" class="w-full" />
        </div>
         <div class="flex-auto">
            <label for="integer" class="font-bold block mb-2"> เขตการเดินรถที่</label>
            <input type="text" (input)="datatableDivision.filter(getDataInput($event),'bmtaZone' , 'contains')"  pInputText id="integer" class="w-full" />
        </div>
        <div class="flex-auto">
            <label for="integer" class="font-bold block mb-2"> อู่รถเมล์ </label>
            <input type="text" (input)="datatableDivision.filter(getDataInput($event),'depotName' , 'contains')"  pInputText id="integer" class="w-full" />
        </div>
        <div class="flex-auto"></div>
        <div class="flex-auto"></div>
        <div class="flex-auto"></div>
    </div>
    </p-accordionTab>
  </p-accordion>
 </div>
   <p-accordion [activeIndex]="0">
    <p-accordionTab header="รายการตั๋วรถเมล์">
      <div class="flex justify-content-between mb-3">
        <h2></h2>
        <p-button
          icon="pi pi-plus"
          label="เพิ่มตั๋วรถเมล์"
          styleClass="p-button-success p-button-sm"
        ></p-button>
      </div> 
        <p-table
        #datatableDivision
        [value]="dataTable"
        [paginator]="true"
        [rows]="10"
        [showCurrentPageReport]="true"
        currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords} ทั้งหมดรายการ"
        [rowsPerPageOptions]="[10, 25, 50]">
             <ng-template pTemplate="header">
            <tr>
                <th style="text-align: center;min-width: 60px;">ลำดับที่</th>
                <th style="text-align: center;">เลขกองปฏิบัติการเดินรถ</th>
                <th>ชื่อกองปฏิบัติการเดินรถ</th>
                <th style="text-align: center;">เขตการเดินรถที่</th>
                <th >อู่รถเมล์</th>
                <th>จัดการ</th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-item let-i="rowIndex">
            <tr>
                <td style="text-align: center;">{{ i + 1 }}</td>
                <td style="text-align: center;">{{ item.busDivisionNo ?? '-'  }} </td>
                <td>{{ item.busDivisionName ?? '-'  }} </td>
                <td style="text-align: center;">{{ item.bmtaZone ?? '-'  }}</td>
                <td>{{item.depotName ?? '-'  }} </td>
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

export class BusDivisionListComponent implements OnInit {
  private _service = inject(BusDivisionService);
  private _changeDetectorRef = inject(ChangeDetectorRef);
  searchText!: string | null;
  dataTable: BusDivision[] = [];
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
