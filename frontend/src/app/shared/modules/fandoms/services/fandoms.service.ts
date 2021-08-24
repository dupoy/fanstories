import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../../../environments/environment.prod';
import { IGetFandomResponse } from '../types/get-fandoms-response.interface';

@Injectable()
export class FandomsService {
  constructor(private readonly http: HttpClient) {}

  getFandoms(): Observable<IGetFandomResponse> {
    const url = `${environment.apiUrl}/fandoms`

    return this.http.get<IGetFandomResponse>(url)
  }
}
