import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { IGetStoryResponse } from '../../shared/types/get-story-response.interface';
import { IStory } from '../../shared/types/story.interface';
import { IStoryRequest } from '../types/story-request.interface';

@Injectable()
export class StoryService {
  constructor(private readonly http: HttpClient) {}

  findOne(slug: string): Observable<IStory> {
    const url = `${environment.apiUrl}/stories/${slug}`
    return this.http.get<IGetStoryResponse>(url).pipe(map(this.getStory))
  }

  delete(slug: string): Observable<any> {
    const url = `${environment.apiUrl}/stories/${slug}`
    return this.http.delete(url)
  }

  create(story: IStoryRequest): Observable<IStory> {
    const url = `${environment.apiUrl}/stories`
    return this.http
      .post<IGetStoryResponse>(url, story)
      .pipe(map(this.getStory))
  }

  update(slug: string, story: IStoryRequest): Observable<IStory> {
    const url = `${environment.apiUrl}/stories/${slug}`
    return this.http.put<IGetStoryResponse>(url, story).pipe(map(this.getStory))
  }

  getStory(response: IGetStoryResponse): IStory {
    return response.story
  }
}
