import { tap } from 'rxjs/operators';
import { PersistenceService } from 'src/app/shared/services/persistence.service';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { logoutAction } from '../action/sync.action';

@Injectable()
export class LogoutEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly persistenseService: PersistenceService,
    private readonly router: Router,
    private readonly store: Store
  ) {}

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutAction),
        tap(() => {
          this.persistenseService.set('accessToken', '')
          this.router.navigate(['/login'])
        })
      ),
    {dispatch: false}
  )
}
