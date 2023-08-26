import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { SharedAppModule } from 'src/app/shared/shared-app.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChipModule } from 'primeng/chip';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginModule } from './module/authentication/login/login.module';
import { HomeComponent } from './module/home/home.component';
import { AuthModule } from './core/auth.module';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { SpinnerInterceptorService } from './shared/interceptor/spinner-interceptor.service';
import { SpinnerLoadModule } from './shared/components/spinner-load/spinner-load.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BusDivisionManagementComponent } from './module/bus-division-management/bus-division-management.component';
import { BusDivisionListComponent } from './module/bus-division-management/bus-division-list/bus-division-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
  ],
  imports: [
    ChipModule,
    ToolbarModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedAppModule,
    LoginModule,
    HomeComponent,
    ToastModule,
    SpinnerLoadModule,
    AuthModule,
    ConfirmDialogModule
  ],
  providers: [MessageService, { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
