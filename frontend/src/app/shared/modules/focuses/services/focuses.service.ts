import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IGetFocusesResponse } from '../types/get-focuses-response.interface';

@Injectable()
export class FocusesService {
  constructor(private readonly http: HttpClient) {}

  getFocuses(): Observable<IGetFocusesResponse> {
    const url = `${environment.apiUrl}/focuses`
    return this.http.get<IGetFocusesResponse>(url)
  }
}
