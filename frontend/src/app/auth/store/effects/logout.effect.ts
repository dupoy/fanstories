import { tap } from 'rxjs/operators';
import { PersistenceService } from 'src/app/shared/services/persistence.service';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { logoutAction } from '../action/sync.action';

@Injectable()
export class LogoutEffect {
  constructor(
    private actions$: Actions,
    private persistenseService: PersistenceService,
    private router: Router
  ) {}

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutAction),
        tap(() => {
          this.persistenseService.set('accessToken', '')
          this.router.navigate(['/'])
        })
      ),
    {dispatch: false}
  )
}
