import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BusDivisionService {
  private _http = inject(HttpClient);

  search() {
    return this._http.get(environment.api_url + '/api/bus-division/search');
  }

  save(req: any) {
    return this._http.post(environment.api_url + '/api/bus-division/save', {
      ...req
    });
  }

  delete(id: any) {
    return this._http.get(environment.api_url + '/api/bus-division/delete/' + id);
  }
}
