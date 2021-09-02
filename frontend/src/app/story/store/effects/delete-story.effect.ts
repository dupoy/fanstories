import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { StoryService } from '../../services/story.service';
import {
    deleteStoryAction, deleteStoryFailureAction, deleteStorySuccessAction
} from '../actions/delete-story.action';

@Injectable()
export class DeleteStoryEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly storyService: StoryService,
    private readonly router: Router
  ) {}

  deleteStory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteStoryAction),
      switchMap(({slug}) =>
        this.storyService.delete(slug).pipe(
          map(() => deleteStorySuccessAction()),
          catchError(() => of(deleteStoryFailureAction()))
        )
      )
    )
  )

  redirectAfterDeletion$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteStorySuccessAction),
        tap(() => this.router.navigate(['/stories']))
      ),
    {dispatch: false}
  )
}
