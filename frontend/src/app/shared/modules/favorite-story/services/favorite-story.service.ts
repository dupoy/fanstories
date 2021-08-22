import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IGetStoryResponse } from 'src/app/shared/types/get-story-response.interface';
import { IStory } from 'src/app/shared/types/story.interface';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FavoriteStoryService {
  constructor(private readonly http: HttpClient) {}

  favoriteStory(slug: string): Observable<IStory> {
    const url = this.getUrl(slug)
    return this.http.post<IGetStoryResponse>(url, {}).pipe(map(this.getStory))
  }

  unfavoriteStory(slug: string): Observable<IStory> {
    const url = this.getUrl(slug)
    return this.http.delete<IGetStoryResponse>(url).pipe(map(this.getStory))
  }

  getUrl(slug: string): string {
    return `${environment.apiUrl}/stories/${slug}/favorite`
  }

  getStory(response: IGetStoryResponse): IStory {
    return response.story
  }
}
