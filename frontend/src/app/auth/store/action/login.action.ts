import { createAction, props } from '@ngrx/store';

import {
    IBackendErrors
} from '../../../shared/modules/backend-errors/types/backend-errors.interface';
import { ICurrentUser } from '../../../shared/types/current-user.interface';
import { ILoginRequest } from '../../types/login-request.interface';
import { ActionTypes } from '../action-types';

export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{request: ILoginRequest}>()
)

export const loginSuccessAction = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{currentUser: ICurrentUser}>()
)

export const loginFailureAction = createAction(
  ActionTypes.LOGIN_FAILURE,
  props<{errors: IBackendErrors}>()
)
