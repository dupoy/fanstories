import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { StoryService } from '../../services/story.service';
import { createStoryFailureAction } from '../actions/create-story.action';
import { updateStoryAction, updateStorySuccessAction } from '../actions/update-story.action';

@Injectable()
export class UpdateStoryEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly storyService: StoryService,
    private readonly router: Router
  ) {}

  updateStory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateStoryAction),
      switchMap(({slug, story}) =>
        this.storyService.update(slug, story).pipe(
          map((story) => updateStorySuccessAction({story})),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              createStoryFailureAction({
                backendErrors: errorResponse.error.message,
              })
            )
          )
        )
      )
    )
  )

  redirectAfterUpdate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateStorySuccessAction),
        tap(({story}) => this.router.navigate(['/stories', story.slug]))
      ),
    {dispatch: false}
  )
}
