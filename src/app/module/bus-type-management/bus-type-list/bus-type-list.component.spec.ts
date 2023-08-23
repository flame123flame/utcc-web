import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusTypeListComponent } from './bus-type-list.component';

describe('BusTypeListComponent', () => {
  let component: BusTypeListComponent;
  let fixture: ComponentFixture<BusTypeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusTypeListComponent]
    });
    fixture = TestBed.createComponent(BusTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
