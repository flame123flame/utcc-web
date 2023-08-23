import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusTypeManagementComponent } from './bus-type-management.component';

describe('BusTypeManagementComponent', () => {
  let component: BusTypeManagementComponent;
  let fixture: ComponentFixture<BusTypeManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusTypeManagementComponent]
    });
    fixture = TestBed.createComponent(BusTypeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
