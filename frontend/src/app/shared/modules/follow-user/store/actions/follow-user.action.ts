import { createAction, props } from '@ngrx/store';

import { IProfile } from '../../../../types/profile.interface';
import { ActionTypes } from '../action-types';

export const followUserAction = createAction(
  ActionTypes.FOLLOW_USER,
  props<{isFollow: boolean; username: string}>()
)

export const followUserSuccessAction = createAction(
  ActionTypes.FOLLOW_USER_SUCCESS,
  props<{profile: IProfile}>()
)

export const followUserFailureAction = createAction(
  ActionTypes.FOLLOW_USER_FAILURE
)
