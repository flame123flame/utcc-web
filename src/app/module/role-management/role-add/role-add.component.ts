import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedModule, ConfirmationService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { PrimeNgModule } from 'src/app/shared/primeng.module';

@Component({
  standalone: true,
  selector: 'app-role-add',
  imports: [SharedModule, PrimeNgModule, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService],
  template: `
  <div style="margin: 20px;">
      <form [formGroup]="formGroup">
      <div class="flex justify-content-between align-items-start mb-3 mt-2">
        <h2>เพิ่มสิทธ์การใช้งาน</h2>
        <p-button
          (click)="confirmSave()"
          icon="pi pi-file"
          label="บันทึก"
          styleClass="p-button-success p-button-sm"
        ></p-button>
      </div>
      <hr>
      <div class="formgrid grid mt-5">
        <div class="field col-6">
          <label >Code<span class="require">*</span></label>
         <div [ngStyle]="isFieldValid('code') ? {border: '1px solid red', borderRadius: '7px'} : null">
          <input
            class="w-full"
            pInputText
            type="text"
            formControlName="code"
            placeholder="กรุณากรอกข้อมูล"
          />
          </div>
        </div>
        <div class="field col-6">
          <label >สิทธ์การใช้งาน<span class="require">*</span></label>
           <div [ngStyle]="isFieldValid('name') ? {border: '1px solid red', borderRadius: '7px'} : null">
          <input
            class="w-full"
            pInputText
            formControlName="name"
            type="text"
            placeholder="กรุณากรอกข้อมูล"
          />
             </div>
        </div>
        <div class="field col-6">
          <label >รายละเอียด</label>
          <input
            class="w-full"
            pInputText
            formControlName="detail"
            type="text"
            placeholder="กรุณากรอกข้อมูล"
          />
        </div>
      </div>
      </form>
    </div>
    `,
})
export class RoleAddComponent implements OnInit {

  submitted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  formGroup = new FormGroup({
    id: new FormControl<number | null>(null),
    name: new FormControl<string | null>(null, Validators.required),
    code: new FormControl<string | null>(null, Validators.required),
    detail: new FormControl(''),
  });

  ngOnInit(): void {
    this.formGroup.reset()
  }
  isFieldValid(field: string) {
    return (
      (!this.formGroup.get(field)?.valid && this.formGroup.get(field)?.touched) ||
      (this.formGroup.get(field)?.untouched && this.submitted$.value)
    );
  }
  confirmSave() {
    if (this.formGroup.invalid) {
      this.submitted$.next(true)
    } else {
      this.submitted$.next(false)
      this.save()
    }
  }

  save() {

  }




}
