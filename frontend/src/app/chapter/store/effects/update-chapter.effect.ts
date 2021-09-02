import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ChapterService } from '../../services/chapter.service';
import {
    updateChapterAction, updateChapterFailureAction, updateChapterSuccessAction
} from '../actions/update-chapter.action';

@Injectable()
export class UpdateChapterEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly chapterService: ChapterService,
    private readonly router: Router
  ) {}

  updateChapter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateChapterAction),
      switchMap(({storySlug, chapterSlug, chapter}) =>
        this.chapterService.update(storySlug, chapterSlug, chapter).pipe(
          map((chapter) => updateChapterSuccessAction({chapter})),
          catchError(() => of(updateChapterFailureAction()))
        )
      )
    )
  )

  redirectAfterUpdate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateChapterSuccessAction),
        tap(() => this.router.navigate(['/stories']))
      ),
    {dispatch: false}
  )
}
