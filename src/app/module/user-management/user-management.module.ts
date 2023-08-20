import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { userManagementRoutes } from './user-management.routing';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(userManagementRoutes)],
})
export class UserManagementModule { }
