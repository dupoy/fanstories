import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IGetStoryResponse } from 'src/app/shared/types/get-story-response.interface';
import { IStory } from 'src/app/shared/types/story.interface';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FollowStoryService {
  constructor(private readonly http: HttpClient) {}

  addToFollow(slug: string): Observable<IStory> {
    const url = this.getUrl(slug)
    return this.http.post<IGetStoryResponse>(url, {}).pipe(map(this.getStory))
  }

  removeFromFollow(slug: string): Observable<IStory> {
    const url = this.getUrl(slug)
    return this.http.delete<IGetStoryResponse>(url).pipe(map(this.getStory))
  }

  getUrl(slug: string): string {
    return `${environment.apiUrl}/stories/${slug}/follow`
  }

  getStory(response: IGetStoryResponse): IStory {
    return response.story
  }
}
