import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BusVehicleService {
  private _http = inject(HttpClient);

  getBusVehicleList() {
    return this._http.get(environment.api_url + '/api/bus-vehicle/get-list');
  }

}
