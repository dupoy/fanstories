import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { RatingsService } from '../../services/ratings.service';
import { IGetRatingsResponse } from '../../types/get-ratings-response.interface';
import {
    getRatingsAction, getRatingsFailureAction, getRatingsSuccessAction
} from '../actions/get-ratings.action';

@Injectable()
export class GetRatingsEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly ratingsService: RatingsService
  ) {}

  getRatings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getRatingsAction),
      switchMap(() =>
        this.ratingsService.getRatings().pipe(
          map(
            (ratings: IGetRatingsResponse) =>
              getRatingsSuccessAction({ratings}),
            catchError(() => of(getRatingsFailureAction()))
          )
        )
      )
    )
  )
}
