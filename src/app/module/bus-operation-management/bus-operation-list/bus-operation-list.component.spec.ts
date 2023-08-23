import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusOperationListComponent } from './bus-operation-list.component';

describe('BusOperationListComponent', () => {
  let component: BusOperationListComponent;
  let fixture: ComponentFixture<BusOperationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusOperationListComponent]
    });
    fixture = TestBed.createComponent(BusOperationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
