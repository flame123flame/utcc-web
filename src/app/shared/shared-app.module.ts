import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhoneNumberFormatDirective } from './directive/phone-number-format.directive';
import { StrongPasswordDirective } from './directive/strong-password.directive';
import { StrongUsernameDirective } from './directive/strong-username.directive';
import { StrongEmailFormatDirective } from './directive/strong-email-format.directive';
import { NumbersOnlyDirective } from './directive/numbers-only.directive';
import { ThaiDatePipe } from './pipes/thaidate.pipe';
import { ThaiDateTimePipe } from './pipes/thai-date-time.pipe';

const componentsModule = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,

];

@NgModule({
  imports: [...componentsModule],
  declarations: [
    PhoneNumberFormatDirective,
    StrongPasswordDirective,
    StrongUsernameDirective,
    StrongEmailFormatDirective,
    NumbersOnlyDirective,
    ThaiDatePipe,
    ThaiDateTimePipe],
  exports: [...componentsModule,
    PhoneNumberFormatDirective,
    StrongPasswordDirective,
    StrongUsernameDirective,
    StrongEmailFormatDirective,
    NumbersOnlyDirective,
    ThaiDatePipe,
    ThaiDateTimePipe],
})
export class SharedAppModule { }
