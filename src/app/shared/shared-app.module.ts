import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhoneNumberFormatDirective } from './directive/phone-number-format.directive';
import { StrongPasswordDirective } from './directive/strong-password.directive';
import { StrongUsernameDirective } from './directive/strong-username.directive';
import { StrongEmailFormatDirective } from './directive/strong-email-format.directive';
import { NumbersOnlyDirective } from './directive/numbers-only.directive';

const componentsModule = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,

];

@NgModule({
  imports: [...componentsModule],
  declarations: [PhoneNumberFormatDirective, StrongPasswordDirective, StrongUsernameDirective, StrongEmailFormatDirective, NumbersOnlyDirective],
  exports: [...componentsModule, PhoneNumberFormatDirective, StrongPasswordDirective, StrongUsernameDirective, StrongEmailFormatDirective, NumbersOnlyDirective],
})
export class SharedAppModule { }
