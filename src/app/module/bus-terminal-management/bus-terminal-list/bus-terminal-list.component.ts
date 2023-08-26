import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { BusTerminal } from 'src/app/shared/interfaces/bus-terminal.interface';
import { UserList } from 'src/app/shared/interfaces/user-list.interface';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { BusTerminalService } from '../service/bus-terminal.service';

@Component({
  standalone: true,
  selector: 'app-bus-terminal-list',
  imports: [PrimeNgModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="mb-2">
  <p-accordion [activeIndex]="0">
    <p-accordionTab header="ค้นหาท่ารถเมล์">
       <div class="flex flex-wrap gap-3 mb-2">
        <div class="flex-auto">
            <label for="integer" class="font-bold block mb-2"> ชื่อท่ารถเมล์ </label>
            <input (input)="datatableBusTerminal.filter(getDataInput($event),'busTerminalName' , 'contains')"  pInputText id="integer" class="w-full" />
        </div>
        <div class="flex-auto"></div>
        <div class="flex-auto"></div>
        <div class="flex-auto"></div>
    </div>
    </p-accordionTab>
  </p-accordion>
 </div>
   <p-accordion [activeIndex]="0">
    <p-accordionTab header="รายการท่ารถเมล์">
      <div class="flex justify-content-between mb-3">
        <h2></h2>
        <p-button
          icon="pi pi-plus"
          label="เพิ่มท่ารถเมล์"
          styleClass="p-button-success p-button-sm"
        ></p-button>
      </div>
        <p-table
        #datatableBusTerminal
        [value]="dataTable"
        [paginator]="true"
        [rows]="10"
        [showCurrentPageReport]="true"
        currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords} ทั้งหมดรายการ"
        [rowsPerPageOptions]="[10, 25, 50]">
             <ng-template pTemplate="header">
            <tr>
                <th style="text-align: center;min-width: 60px;">ลำดับที่</th>
                <th>ชื่อท่ารถ</th>
                <th>วันที่ส้ราง</th>
                <th>จัดการ</th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-role let-i="rowIndex">
            <tr>
                <td style="text-align: center;">{{ i + 1 }}</td>
                <td>{{ role.busTerminalName ?? '-'  }} </td>
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
export class BusTerminalListComponent implements OnInit {
  private _service = inject(BusTerminalService);
  private _changeDetectorRef = inject(ChangeDetectorRef);
  searchText!: string | null;
  dataTable: BusTerminal[] = [];
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
