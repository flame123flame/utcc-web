import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FareService {
  private _http = inject(HttpClient);

  search() {
    return this._http.get(environment.api_url + '/api/fare/search');
  }

}
