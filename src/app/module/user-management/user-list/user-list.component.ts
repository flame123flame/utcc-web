import { UserService } from './../service/user.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Role } from 'src/app/shared/interfaces/role.interface';
import { PrimeNgModule } from 'src/app/shared/primeng.module';
import { UserList } from 'src/app/shared/interfaces/user-list.interface';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { SharedAppModule } from 'src/app/shared/shared-app.module';
import { ToastService } from 'src/app/shared/services/toast.service';
import { RoleService } from '../../role-management/service/role.service';

interface Prefix {
  prefix: string;
  code: string;
}

@Component({
  standalone: true,
  selector: 'app-user-list',
  imports: [
    PrimeNgModule,
    SharedAppModule,

  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService],
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  private _roleService: RoleService;
  private _userService: UserService;
  private _changeDetectorRef: ChangeDetectorRef;
  private fb: FormBuilder;
  private _toastService: ToastService;

  searchText: string | null = null;
  dataUsers: UserList[] = [];
  sidebar = false;
  statusVisible = 'ADD';
  registerForm!: FormGroup;
  submittedForm$ = new BehaviorSubject<boolean>(false);
  prefix: Prefix[] = [];

  dataRoles: Role[] = [];

  constructor(
    roleService: RoleService,
    userService: UserService,
    changeDetectorRef: ChangeDetectorRef,
    fb: FormBuilder,
    toastService: ToastService
  ) {
    this._roleService = roleService;
    this._userService = userService;
    this._changeDetectorRef = changeDetectorRef;
    this.fb = fb;
    this._toastService = toastService;
  }

  ngOnInit(): void {
    this.prefix = [
      { prefix: 'นาย', code: 'นาย' },
      { prefix: 'นางสาว', code: 'นางสาว' },
      { prefix: 'นาง', code: 'นาง' },
    ];
    this.getUser();
    this.createForm();

  }

  createForm(): void {
    this.registerForm = this.fb.group({
      platform: new FormControl<string | null>('WEBSITE', Validators.required),
      username: new FormControl<string | null>(null, Validators.required),
      password: new FormControl<string | null>(null, Validators.required),
      confirmPassword: new FormControl<string | null>(null, Validators.required),
      roleCode: new FormControl<string | null>(null, Validators.required),
      firstName: new FormControl<string | null>(null, Validators.required),
      lastName: new FormControl<string | null>(null, Validators.required),
      prefix: new FormControl<string | null>(null, Validators.required),
      email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
      phoneNumber: new FormControl<string | null>(null, Validators.required),
      position: new FormControl<string | null>(null, Validators.required),
    });
  }

  getRole(platform: string): void {
    this._roleService.getRoleList().subscribe({
      next: (response: any) => {
        const data: any = response;
        this.dataRoles = data['data'];
        const filteredRoles = this.filterRolesByPlatform(this.dataRoles, platform);
        this.dataRoles = filteredRoles;
        this._changeDetectorRef.markForCheck();
      },
      error: (err) => {
        // Handle error
      },
    });
  }

  filterRolesByPlatform(roles: Role[], platform: string): Role[] {
    return roles.filter((role) => role.platform === platform);
  }

  getUser(): void {
    this._userService.getUserList().subscribe({
      next: (response: any) => {
        const data: any = response;
        this.dataUsers = data['data'];
        this._changeDetectorRef.markForCheck();
      },
      error: (err) => {
        // Handle error
      },
    });
  }

  switchPlatform(p: string): void {
    this.getRole(p);
    this._changeDetectorRef.markForCheck();
  }

  getDataInput(data: any): string {
    return data.target.value;
  }

  openSidebar(): void {
    this.getRole('WEBSITE');
    this.sidebar = true;
  }

  onCloseAction(): void {
    this.sidebar = false;
  }

  isFieldValid(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!control?.invalid && (!!control?.touched || (!!control?.untouched && this.submittedForm$.value));
  }

  private handleInvalidForm(): void {
    this.submittedForm$.next(true);
    this._toastService.addSingle('warn', 'แจ้งเตือน', 'โปรดกรอกข้อมูลให้ครบถ้วน!');
  }

  private arePasswordsMatching(): boolean {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

  private showPasswordMismatchError(): void {
    this._toastService.addSingle('warn', 'แจ้งเตือน', 'รหัสผ่านไม่ตรงกัน!');
  }



  validateForm(): void {
    if (this.registerForm.invalid) {
      this.handleInvalidForm();
      return;
    }
    if (!this.arePasswordsMatching()) {
      this.showPasswordMismatchError();
      return;
    }
    this.submittedForm$.next(false);
    this.save()
  }


  save(): void {
    if (this.registerForm.valid && this.arePasswordsMatching()) {
      this._userService.save(this.registerForm.value).subscribe({
        next: (response: any) => {
          const data: any = response;
          this.handleSaveSuccess();
        },
        error: (err) => {
          if (err.error.message == "DUPLICATE_USER") {
            this.handleSaveErrorDuplicateUser();
          }
        }
      });
    }
  }

  private handleSaveSuccess(): void {
    this.onCloseAction();
    this.getUser();
    this._toastService.addSingle('success', 'แจ้งเตือน', 'บันทึกข้อมูลสำเร็จ');
  }

  private handleSaveErrorDuplicateUser(): void {
    this._toastService.addSingle('error', 'แจ้งเตือน', 'ผู้ใช้งานนี้มีในระบบแล้ว!');
  }
}