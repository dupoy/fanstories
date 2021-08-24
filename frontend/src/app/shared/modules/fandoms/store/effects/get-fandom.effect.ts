import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { FandomsService } from '../../services/fandoms.service';
import { IGetFandomResponse } from '../../types/get-fandoms-response.interface';
import {
    getFandomsAction, getFandomsFailureAction, getFandomsSuccessAction
} from '../actions/get-fandoms.action';

@Injectable()
export class GetFandomEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly fandomsService: FandomsService
  ) {}

  getFandoms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFandomsAction),
      switchMap(() =>
        this.fandomsService.getFandoms().pipe(
          map(
            (data: IGetFandomResponse) => getFandomsSuccessAction({data}),
            catchError(() => of(getFandomsFailureAction()))
          )
        )
      )
    )
  )
}
