import { createAction, props } from '@ngrx/store';

import { IGetFocusesResponse } from '../../types/get-focuses-response.interface';
import { ActionTypes } from '../action-types';

export const getFocusesAction = createAction(ActionTypes.GET_FOCUSES)
export const getFocusesSuccessAction = createAction(
  ActionTypes.GET_FOCUSES_SUCCESS,
  props<{focuses: IGetFocusesResponse}>()
)
export const getFocusesFailureAction = createAction(
  ActionTypes.GET_FOCUSES_FAILURE
)
