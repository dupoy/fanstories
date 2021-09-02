import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ChapterService } from '../../services/chapter.service';
import {
    createChapterAction, createChapterFailureAction, createChapterSuccessAction
} from '../actions/create-chapter.action';

@Injectable()
export class CreateChapterEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly chapterService: ChapterService,
    private readonly router: Router
  ) {}

  createChapter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createChapterAction),
      switchMap(({slug, chapter}) =>
        this.chapterService.create(slug, chapter).pipe(
          map((chapter) => createChapterSuccessAction({chapter})),
          catchError(() => of(createChapterFailureAction()))
        )
      )
    )
  )

  redirectAfterCreation$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createChapterSuccessAction),
        tap(() => this.router.navigate(['/stories']))
      ),
    {dispatch: false}
  )
}
