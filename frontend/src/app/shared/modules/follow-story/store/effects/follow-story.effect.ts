import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { PersistenceService } from 'src/app/shared/services/persistence.service';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { IStory } from '../../../../types/story.interface';
import { FollowStoryService } from '../../service/follow-story.service';
import {
    followStoryAction, followStoryFailureAction, followStorySuccessAction
} from '../actions/follow-story.action';

@Injectable()
export class FollowStoryEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly followStoryService: FollowStoryService,
    private readonly persistenceService: PersistenceService,
    private readonly router: Router
  ) {}

  followStory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(followStoryAction),
      switchMap(({isFollow, slug}) => {
        const story$ = isFollow
          ? this.followStoryService.removeFromFollow(slug)
          : this.followStoryService.addToFollow(slug)

        return story$.pipe(
          map(
            (story: IStory) => followStorySuccessAction({story}),
            catchError(() => of(followStoryFailureAction()))
          )
        )
      })
    )
  )

  checkAuth$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(followStoryAction),
        tap(() => {
          const token = this.persistenceService.get('accessToken')
          token || this.router.navigate(['login'])
        })
      ),
    {dispatch: false}
  )
}
