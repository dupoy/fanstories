import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { IProfile } from 'src/app/shared/types/profile.interface';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { PersistenceService } from '../../../../services/persistence.service';
import { FollowUserService } from '../../services/follow-user.service';
import {
    followUserAction, followUserFailureAction, followUserSuccessAction
} from '../actions/follow-user.action';

@Injectable()
export class FollowUserEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly followUserService: FollowUserService,
    private readonly store: Store,
    private readonly router: Router,
    private readonly persistenceService: PersistenceService
  ) {}

  followUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(followUserAction),
      switchMap(({isFollow, username}) => {
        const profile$ = isFollow
          ? this.followUserService.unfollowUser(username)
          : this.followUserService.followUser(username)

        return profile$.pipe(
          map(
            (profile: IProfile) => followUserSuccessAction({profile}),
            catchError(() => of(followUserFailureAction()))
          )
        )
      })
    )
  )

  checkAuth$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(followUserAction),
        tap(() => {
          const token = this.persistenceService.get('accessToken')
          token || this.router.navigateByUrl('login')
        })
      ),
    {dispatch: false}
  )
}
