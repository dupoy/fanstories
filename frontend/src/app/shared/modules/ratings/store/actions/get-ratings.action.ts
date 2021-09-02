import { createAction, props } from '@ngrx/store';

import { IGetRatingsResponse } from '../../types/get-ratings-response.interface';
import { ActionTypes } from '../action-types';

export const getRatingsAction = createAction(ActionTypes.GET_RATINGS)
export const getRatingsSuccessAction = createAction(
  ActionTypes.GET_RATINGS_SUCCESS,
  props<{ratings: IGetRatingsResponse}>()
)
export const getRatingsFailureAction = createAction(
  ActionTypes.GET_RATINGS_FAILURE
)
