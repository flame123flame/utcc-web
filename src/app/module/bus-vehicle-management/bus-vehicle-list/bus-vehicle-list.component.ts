import { PrimeNgModule } from './../../../shared/primeng.module';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Role } from 'src/app/shared/interfaces/role.interface';
import { BusVehicleService } from '../service/bus-vehicle.service';
import { BusVehicle } from 'src/app/shared/interfaces/bus-vehicle.interface';

@Component({
  standalone: true,
  selector: 'app-bus-vehicle-list',
  imports: [
    PrimeNgModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService],
  templateUrl: './bus-vehicle-list.component.html',
})
export class BusVehicleListComponent implements OnInit {
  private _service = inject(BusVehicleService);
  private _changeDetectorRef = inject(ChangeDetectorRef);

  dataTable: BusVehicle[] = [];
  sidebarVisible2: boolean = false;
  constructor() { }

  ngOnInit() {
    this.getRole()
  }

  getDataInput(data: any) {
    return data.target.value
  }


  getRole() {
    this._service.getBusVehicleList().subscribe({
      next: (response: any) => {
        const data: any = response;
        this.dataTable = data['data']
        this._changeDetectorRef.markForCheck()
      },
      error: (err) => {

      }
    });
  }

}
