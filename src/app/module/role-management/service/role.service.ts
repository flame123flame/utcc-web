import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RoleService {
  private _http = inject(HttpClient);

  getRoleList() {
    return this._http.get(environment.api_url + '/api/role/get-list');
  }

}
