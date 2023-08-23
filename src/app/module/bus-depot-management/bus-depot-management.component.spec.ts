import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusDepotManagementComponent } from './bus-depot-management.component';

describe('BusDepotManagementComponent', () => {
  let component: BusDepotManagementComponent;
  let fixture: ComponentFixture<BusDepotManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusDepotManagementComponent]
    });
    fixture = TestBed.createComponent(BusDepotManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
