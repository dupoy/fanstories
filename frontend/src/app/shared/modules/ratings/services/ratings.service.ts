import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IGetRatingsResponse } from '../types/get-ratings-response.interface';

@Injectable()
export class RatingsService {
  constructor(private readonly http: HttpClient) {}

  getRatings(): Observable<IGetRatingsResponse> {
    const url = `${environment.apiUrl}/ratings`
    return this.http.get<IGetRatingsResponse>(url)
  }
}
