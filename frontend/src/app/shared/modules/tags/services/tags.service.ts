import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../../../environments/environment';
import { IGetTagsResponse } from '../types/get-tags-response.interface';

@Injectable()
export class TagsService {
  constructor(private readonly http: HttpClient) {}

  getTags(): Observable<IGetTagsResponse> {
    const url = `${environment.apiUrl}/tags`
    return this.http.get<IGetTagsResponse>(url)
  }
}
