import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PersistenceService } from 'src/app/shared/services/persistence.service';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ICurrentUser } from '../../../shared/types/current-user.interface';
import { AuthService } from '../../services/auth.service';
import {
    getCurrentUserAction, getCurrentUserFailureAction, getCurrentUserSuccessAction
} from '../action/get-current-user.action';

@Injectable()
export class GetCurrentUserEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistenseService: PersistenceService
  ) {}

  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        return this.authService.getCurrentUser().pipe(
          map((currentUser: ICurrentUser) => {
            this.persistenseService.set('accessToken', currentUser.token)
            return getCurrentUserSuccessAction({currentUser})
          }),
          catchError(() => of(getCurrentUserFailureAction()))
        )
      })
    )
  )
}
