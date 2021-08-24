import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { IProfile } from '../../../shared/types/profile.interface';
import { UserProfileService } from '../../services/user-profile.service';
import {
    getProfileAction, getProfileFailureAction, getProfileSuccessAction
} from '../actions/get-profile.action';

@Injectable()
export class GetProfileEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly userProfileService: UserProfileService
  ) {}

  getUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProfileAction),
      switchMap(({username}) => {
        return this.userProfileService.getUserProfile(username).pipe(
          map(
            (profile: IProfile) => getProfileSuccessAction({profile}),
            catchError(() => of(getProfileFailureAction()))
          )
        )
      })
    )
  )
}
