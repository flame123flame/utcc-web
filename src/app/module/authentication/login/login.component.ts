import { ISignInResponse } from './../../../shared/services/auth/payload.interface';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { IUser } from './../../../shared/interfaces/user.interface';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService, MessageService]
})
export class LoginComponent implements OnInit {
  user: IUser | null = null;
  imageUrl = './assets/images/BMTA_Logo2014-th.svg';
  imageUrlBackgroud = './assets/images/login-image.jpeg';
  constructor(
    private _authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this._authService.user$.subscribe(res => {
      this.user = res;
    })
  }

  private _toastService = inject(ToastService);

  errorDialog(error: any) {
    if (error.status == 401) {
      this._toastService.addSingle('error', 'เข้าสู่ระบบ', 'ผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง');
    } else {
      this._toastService.addSingle('error', 'พบข้อผิดพลาด', 'เกิดข้อผิดพลาดทางระบบ');
    }
  }

  username: string = '';
  password: string = '';
  dataPackageJson: any;
  redirectURL: string = '';

  ngOnInit() {
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      this.redirectURL = params['redirectURL'];
    })
  }

  notiError() {
    this.messageService.add({ severity: 'warn', summary: 'เข้าสู่ระบบ', detail: 'กรอก username หรือ password มากกว่า 6ตัว' });
  }

  onInputChange(event: any) {
    let inputValue = event.target.value.toLowerCase().trim();
    event.target.value = inputValue.replace(/[\u0E00-\u0E7F]/g, '');
  }

  onInputChangeTrim(event: any) {
    let inputValue = event.target.value.trim();
    event.target.value = inputValue;
  }

  onLogin() {
    if (this.username.length < 5 && this.password.length > 5) {
      this.notiError();
    } else {
      ;
      this._authService
        .signIn({
          username: this.username,
          password: this.password,
        })
        .pipe(take(1))
        .subscribe({
          next: (res: ISignInResponse) => {
            this._authService.token = res.jwttoken;
            this._authService.user = {
              ...res,
              roleCode: res.roleCode.split(',')
            };
            this._authService.isLoggedIn = true;

            this.router.navigate(['/home']).then(() => {
              this._toastService.addSingle('success', 'เข้าสู่ระบบ', 'เข้าสู่ระบบสำเร็จ');
            });
          },
          error: error => {
            this.errorDialog(error)
          },
        });
    }
  }
}


