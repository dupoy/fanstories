import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../../../environments/environment';
import { IGetStoriesResponse } from '../types/get-stories-response.interface';

@Injectable()
export class StoriesService {
  constructor(private http: HttpClient) {}

  getStories(url: string): Observable<IGetStoriesResponse> {
    const fullUrl = environment.apiUrl + url
    return this.http.get<IGetStoriesResponse>(fullUrl)
  }
}
