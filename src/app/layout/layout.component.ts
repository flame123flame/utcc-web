import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService, LayoutType as lt } from './layout.service';
import { Component, inject, OnInit } from '@angular/core';
import { SIDEBAR_MENU } from '../shared/constants/sidebar-menu.constant';
import { SidebarMenu } from '../shared/interfaces/sidebar-menu.interface';
import { AuthService } from '../shared/services/auth/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';



@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class LayoutComponent implements OnInit {
  _layoutService = inject(LayoutService);
  _route = inject(ActivatedRoute)
  _router = inject(Router)
  _authService = inject(AuthService)
  layoutType$ = this._layoutService.layout$;
  LayoutTyped = lt;
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit() {
    this._route.data.subscribe((data) => {
      this._layoutService.layout$.next(data['layout']);
    });
  }

  isToggle: boolean = true;


  positionLeft = '270px';
  positionTop = '-20px';
  marginStyle = {
    'margin-left': this.positionLeft,
    'margin-top': this.positionTop,
  };

  items: SidebarMenu[] = SIDEBAR_MENU;
  public isActive(path: string): boolean {
    return this._router.url.includes(`${path}`);
  }

  logout() {
    this._authService.signOut()
  }

  open() {
    this.isToggle = !this.isToggle
  }



  confirmPosition() {
    this.confirmationService.confirm({
      message: 'คุณต้องการออกจากระบบใช่หรือไม่?',
      header: 'ยืนยันการออกจากระบบ',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.logout()
      },
      reject: () => {
      },
      key: 'positionDialog'
    });
  }
}
