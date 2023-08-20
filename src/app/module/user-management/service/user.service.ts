import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _http = inject(HttpClient);

  getUserList() {
    return this._http.post(environment.api_url + '/api/user/get-user', {});
  }

}
