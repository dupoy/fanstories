import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { StoriesService } from '../../services/stories.service';
import { IGetStoriesResponse } from '../../types/get-stories-response.interface';
import {
    getStoriesAction, getStoriesFailureAction, getStoriesSuccessAction
} from '../actions/get-stories.action';

@Injectable()
export class GetStoriesEffect {
  constructor(
    private readonly action$: Actions,
    private readonly storiesService: StoriesService
  ) {}

  getStories$ = createEffect(() =>
    this.action$.pipe(
      ofType(getStoriesAction),
      switchMap(({url}) => {
        return this.storiesService.getStories(url).pipe(
          map((stories: IGetStoriesResponse) => {
            return getStoriesSuccessAction({stories})
          }),
          catchError(() => of(getStoriesFailureAction()))
        )
      })
    )
  )
}
