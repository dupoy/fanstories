import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { FocusesService } from '../../services/focuses.service';
import { IGetFocusesResponse } from '../../types/get-focuses-response.interface';
import {
    getFocusesAction, getFocusesFailureAction, getFocusesSuccessAction
} from '../actions/get-focuses.action';

@Injectable()
export class GetFocusesEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly focusesService: FocusesService
  ) {}

  getFocuses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFocusesAction),
      switchMap(() =>
        this.focusesService.getFocuses().pipe(
          map(
            (focuses: IGetFocusesResponse) =>
              getFocusesSuccessAction({focuses}),
            catchError(() => of(getFocusesFailureAction()))
          )
        )
      )
    )
  )
}
