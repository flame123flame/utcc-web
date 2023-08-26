import { ConfirmationService } from 'primeng/api';
import { PrimeNgModule } from './../../../shared/primeng.module';
import { Component, inject, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RoleService } from '../service/role.service';
import { Role } from 'src/app/shared/interfaces/role.interface';
import { RoleAddComponent } from '../role-add/role-add.component';

@Component({
  standalone: true,
  selector: 'app-role-list',
  imports: [
    PrimeNgModule,
    RoleAddComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService],
  template: `
 <div class="mb-2">
  <p-accordion [activeIndex]="0">
    <p-accordionTab header="ค้นหารายการสิทธ์การใช้งาน">
       <div class="flex flex-wrap gap-3 mb-2">
        <div class="flex-auto">
            <label for="integer" class="font-bold block mb-2"> Code </label>
            <input (input)="datatableRole.filter(getDataInput($event),'roleCode' , 'contains')"  pInputText id="integer" class="w-full" />
        </div>
        <div class="flex-auto">
            <label for="number" class="font-bold block mb-2"> สิทธ์การใช้งาน </label>
            <input (input)="datatableRole.filter(getDataInput($event),'roleName' , 'contains')"  pInputText id="integer" class="w-full" pInputText class="w-full" />
        </div>
        <div class="flex-auto"></div>
        <div class="flex-auto"></div>
    </div>
    </p-accordionTab>
  </p-accordion>
 </div>
 <p-accordion [activeIndex]="0">
    <p-accordionTab header="รายการสิทธ์การใช้งาน">
      <div class="flex justify-content-between mb-3">
        <h2></h2>
        <p-button
        (click)="sidebarVisible2 = true"
          icon="pi pi-plus"
          label="เพิ่มสิทธ์การใช้งาน"
          styleClass="p-button-success p-button-sm"
        ></p-button>
      </div>
        <p-table
        #datatableRole
        [value]="dataRoles"
        [paginator]="true"
        [rows]="10"
        [showCurrentPageReport]="true"
        currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords} ทั้งหมดรายการ"
        [rowsPerPageOptions]="[10, 25, 50]">
        <ng-template pTemplate="header">
            <tr>
                <th style="width:20%"> Code</th>
                <th style="width:20%">สิทธ์การใช้งาน</th>
                <th style="width:20%">รายละเอียด</th>
                <th style="width:20%">วันที่ส้ราง</th>
                <th style="width:20%">จัดการ</th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-role>
            <tr>
                <td>{{ role.roleCode ?? '-'  }}</td>
                <td>{{ role.roleName ?? '-'  }}</td>
                <td>{{ role.roleDescription ?? '-'  }}</td>
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


     <p-sidebar [(visible)]="sidebarVisible2" position="right"   styleClass="w-5">
        <app-role-add></app-role-add>
    </p-sidebar>
`
})
export class RoleListComponent implements OnInit {
  private _roleService = inject(RoleService);
  private _changeDetectorRef = inject(ChangeDetectorRef);

  dataRoles: Role[] = [];
  sidebarVisible2: boolean = false;
  constructor() { }

  ngOnInit() {
    this.getRole()
  }


  getRole() {
    this._roleService.getRoleList().subscribe({
      next: (response: any) => {
        const data: any = response;
        this.dataRoles = data['data']
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
