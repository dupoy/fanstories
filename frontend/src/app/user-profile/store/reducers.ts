import { Action, createReducer, on } from '@ngrx/store';

import { IUserProfileState } from '../types/user-profile-state.interface';
import {
    getProfileAction, getProfileFailureAction, getProfileSuccessAction
} from './actions/get-profile.action';

const initialState: IUserProfileState = {
  isLoading: false,
  backendError: null,
  data: null,
}

const userProfileReducer = createReducer(
  initialState,
  on(
    getProfileAction,
    (state): IUserProfileState => ({...state, isLoading: true})
  ),
  on(
    getProfileSuccessAction,
    (state, action): IUserProfileState => ({
      ...state,
      isLoading: false,
      data: action.profile,
    })
  ),
  on(
    getProfileFailureAction,
    (state): IUserProfileState => ({...state, isLoading: false})
  )
)

export function reducer(state: IUserProfileState, action: Action) {
  return userProfileReducer(state, action)
}
