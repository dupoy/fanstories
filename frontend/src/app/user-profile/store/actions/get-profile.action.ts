import { IProfile } from 'src/app/shared/types/profile.interface';

import { createAction, props } from '@ngrx/store';

import { ActionTypes } from '../action-types';

export const getProfileAction = createAction(
  ActionTypes.GET_USER_PROFILE,
  props<{username: string}>()
)

export const getProfileSuccessAction = createAction(
  ActionTypes.GET_USER_PROFILE_SUCCESS,
  props<{profile: IProfile}>()
)

export const getProfileFailureAction = createAction(
  ActionTypes.GET_USER_PROFILE_FAILURE
)
