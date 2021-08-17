import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { PersistenceService } from 'src/app/shared/services/persistence.service';

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ICurrentUser } from '../../../shared/types/current-user.interface';
import { AuthService } from '../../services/auth.service';
import {
    registerAction, registerFailureAction, registerSuccessAction
} from '../action/register.action';

@Injectable()
export class RegisterEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private persistenseService: PersistenceService
  ) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({request}) => {
        return this.authService.register(request).pipe(
          map((currentUser: ICurrentUser) => {
            this.persistenseService.set('accessToken', currentUser.token)
            return registerSuccessAction({currentUser})
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(registerFailureAction({errors: errorResponse.error.message}))
          )
        )
      })
    )
  )

  registerAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccessAction),
        tap(() => this.router.navigateByUrl('/'))
      ),
    {dispatch: false}
  )
}
