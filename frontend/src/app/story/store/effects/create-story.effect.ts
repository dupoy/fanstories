import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { StoryService } from '../../services/story.service';
import {
    createStoryAction, createStoryFailureAction, createStorySuccessAction
} from '../actions/create-story.action';

@Injectable()
export class CreateStoryEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly storyService: StoryService,
    private readonly router: Router
  ) {}

  createStory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createStoryAction),
      switchMap(({story}) =>
        this.storyService.create(story).pipe(
          map((story) => createStorySuccessAction({story})),
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

  redirectAfterCreation$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createStorySuccessAction),
        tap(({story}) => this.router.navigate(['/stories', story.slug]))
      ),
    {dispatch: false}
  )
}
