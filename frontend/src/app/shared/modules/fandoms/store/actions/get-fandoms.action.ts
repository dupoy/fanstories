import { createAction, props } from '@ngrx/store';

import { IGetFandomResponse } from '../../types/get-fandoms-response.interface';
import { ActionTypes } from '../action-types';

export const getFandomsAction = createAction(ActionTypes.GET_FANDOMS)
export const getFandomsSuccessAction = createAction(
  ActionTypes.GET_FANDOMS_SUCCESS,
  props<{data: IGetFandomResponse}>()
)
export const getFandomsFailureAction = createAction(
  ActionTypes.GET_FANDOMS_FAILURE
)
