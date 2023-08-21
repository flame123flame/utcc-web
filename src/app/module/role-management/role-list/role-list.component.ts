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
  template: `<p-card header="">
      <div class="flex justify-content-between mb-3">
        <h2>รายการสิทธ์การใช้งาน</h2>
        <p-button
        (click)="sidebarVisible2 = true"
          icon="pi pi-plus"
          label="เพิ่มสิทธ์การใช้งาน"
          styleClass="p-button-success p-button-sm"
        ></p-button>
      </div>
        <p-table
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
    </p-card>
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

}
