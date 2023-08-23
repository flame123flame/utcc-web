import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusDepotListComponent } from './bus-depot-list.component';

describe('BusDepotListComponent', () => {
  let component: BusDepotListComponent;
  let fixture: ComponentFixture<BusDepotListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusDepotListComponent]
    });
    fixture = TestBed.createComponent(BusDepotListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
