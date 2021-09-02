import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IStory } from 'src/app/shared/types/story.interface';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { StoryService } from '../../services/story.service';
import {
    getStoryAction, getStoryFailureAction, getStorySuccessAction
} from '../actions/get-story.action';

@Injectable()
export class GetStoryEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly storyService: StoryService
  ) {}

  getStory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getStoryAction),
      switchMap(({slug}) =>
        this.storyService.findOne(slug).pipe(
          map((story: IStory) => getStorySuccessAction({story})),
          catchError(() => of(getStoryFailureAction()))
        )
      )
    )
  )
}
