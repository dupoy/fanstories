import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IChapter } from 'src/app/shared/types/chapter.interface';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IChapterRequest } from '../types/chapter-request.interface';
import { IGetChapterResponse } from '../types/get-chapter-response.interface';

@Injectable()
export class ChapterService {
  constructor(private readonly http: HttpClient) {}

  create(slug: string, chapter: IChapterRequest): Observable<IChapter> {
    const url = `${environment.apiUrl}/stories/${slug}/chapters`
    return this.http
      .post<IGetChapterResponse>(url, chapter)
      .pipe(map(this.getChapter))
  }

  update(
    storySlug: string,
    chapterSlug: string,
    chapter: IChapterRequest
  ): Observable<IChapter> {
    const url = `${environment.apiUrl}/stories/${storySlug}/chapters/${chapterSlug}`
    console.log(url)

    return this.http
      .put<IGetChapterResponse>(url, chapter)
      .pipe(map(this.getChapter))
  }

  get(storySlug: string, chapterSlug: string): Observable<IChapter> {
    const url = `${environment.apiUrl}/stories/${storySlug}/chapters/${chapterSlug}`
    return this.http.get<IGetChapterResponse>(url).pipe(map(this.getChapter))
  }

  getChapter(response: IGetChapterResponse): IChapter {
    return response.chapter
  }
}
