import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ChapterService } from '../../services/chapter.service';
import {
    getChapterAction, getChapterFailureAction, getChapterSuccessAction
} from '../actions/get-chapter.action';

@Injectable()
export class GetChapterEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly chapterService: ChapterService
  ) {}

  createChapter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getChapterAction),
      switchMap(({storySlug, chapterSlug}) =>
        this.chapterService.get(storySlug, chapterSlug).pipe(
          map((chapter) => getChapterSuccessAction({chapter})),
          catchError(() => of(getChapterFailureAction()))
        )
      )
    )
  )
}
