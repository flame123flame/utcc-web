import { UserService } from './../service/user.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Role } from 'src/app/shared/interfaces/role.interface';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { UserList } from 'src/app/shared/interfaces/user-list.interface';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';

@Component({
  standalone: true,
  selector: 'app-user-list',
  imports: [
    PrimeNgModule,

  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService],
  template: `
  <div class="mb-2">
  <p-accordion [activeIndex]="0">
    <p-accordionTab header="ค้นหารายการผู้ใช้งาน">
       <div class="flex flex-wrap gap-3 mb-2">
        <div class="flex-auto">
            <label for="integer" class="font-bold block mb-2"> 	ชื่อ-นามสกุล </label>
            <input (input)="datatableUser.filter(getDataInput($event),'fullName' , 'contains')"  pInputText id="integer" class="w-full" />
        </div>
        <div class="flex-auto">
            <label for="number" class="font-bold block mb-2"> เบอร์โทรศัพท์ </label>
            <input (input)="datatableUser.filter(getDataInput($event),'phoneNumber' , 'contains')"  pInputText id="integer" class="w-full" pInputText class="w-full" />
        </div>
         <div class="flex-auto">
            <label for="number" class="font-bold block mb-2"> ตำแหน่ง </label>
            <input (input)="datatableUser.filter(getDataInput($event),'position' , 'contains')"  pInputText id="integer" class="w-full" pInputText class="w-full" />
        </div>
         <div class="flex-auto"></div>
          <div class="flex-auto"></div>
    </div>
    </p-accordionTab>
  </p-accordion>
 </div>
   <p-accordion [activeIndex]="0">
    <p-accordionTab header="รายการผู้ใช้งาน">
      <div class="flex justify-content-between mb-3">
        <h2></h2>
        <p-button
          icon="pi pi-plus"
          label="เพิ่มผู้ใช้งาน"
          styleClass="p-button-success p-button-sm"
        ></p-button>
      </div>
        <p-table
        #datatableUser
        [value]="dataUsers"
        [paginator]="true"
        [rows]="10"
        [showCurrentPageReport]="true"
        currentPageReportTemplate="แสดง {first} ถึง {last} จาก {totalRecords} ทั้งหมดรายการ"
        [rowsPerPageOptions]="[10, 25, 50]">
             <ng-template pTemplate="header">
            <tr>
                <th style="text-align: center;min-width: 60px;">ลำดับที่</th>
                <th>ชื่อ-นามสกุล</th>
                <th>เบอร์โทรศัพท์</th>
                <th>ตำแหน่ง</th>
                <th>วันที่ส้ราง</th>
                <th>จัดการ</th>
            </tr>
        </ng-template>
        <ng-template pTemplate="body" let-role let-i="rowIndex">
            <tr>
                <td style="text-align: center;">{{ i + 1 }}</td>
                <td>{{ role.fullName ?? '-'  }} </td>
                <td>{{ role.phoneNumber ?? '-'  }}</td>
                <td>{{ role.position ?? '-'  }}</td>
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

   
`
})
export class UserListComponent implements OnInit {
  private _userService = inject(UserService);
  private _changeDetectorRef = inject(ChangeDetectorRef);
  searchText!: string | null;
  dataUsers: UserList[] = [];
  sidebarVisible2: boolean = false;
  constructor() { }

  ngOnInit() {
    this.getUser()
  }

  getUser() {
    this._userService.getUserList().subscribe({
      next: (response: any) => {
        const data: any = response;
        this.dataUsers = data['data']
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
