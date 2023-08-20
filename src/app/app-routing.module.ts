import { LayoutType } from './layout/layout.service';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './module/home/home.component';
import { NoAuthGuard } from './core/guards/noAuth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/sign-in',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: LayoutType.AUTH
    },
    children: [
      { path: '', component: HomeComponent }
    ]
  },
  {
    path: 'role',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: LayoutType.AUTH
    },
    children: [
      { path: '', loadChildren: () => import('./module/role-management/role-management.module').then(m => m.RoleManagementModule), }
    ]
  },
  {
    path: 'sign-in',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    component: LayoutComponent,
    data: {
      layout: LayoutType.NO_AUTH
    },
    children: [
      { path: '', loadChildren: () => import('./module/authentication/login/login.module').then(m => m.LoginModule), }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
