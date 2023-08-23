import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusOperationManagementComponent } from './bus-operation-management.component';

describe('BusOperationManagementComponent', () => {
  let component: BusOperationManagementComponent;
  let fixture: ComponentFixture<BusOperationManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusOperationManagementComponent]
    });
    fixture = TestBed.createComponent(BusOperationManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
