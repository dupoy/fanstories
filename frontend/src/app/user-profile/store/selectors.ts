import { IAppState } from 'src/app/shared/types/app-state.interface';

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IUserProfileState } from '../types/user-profile-state.interface';

const userProfileFeatureSelector = createFeatureSelector<
  IAppState,
  IUserProfileState
>('userProfile')

export const isLoadingSelector = createSelector(
  userProfileFeatureSelector,
  (userProfile: IUserProfileState) => userProfile.isLoading
)

export const backendErrorsSelector = createSelector(
  userProfileFeatureSelector,
  (userProfile: IUserProfileState) => userProfile.backendError
)

export const userProfileSelector = createSelector(
  userProfileFeatureSelector,
  (userProfile: IUserProfileState) => userProfile.data
)
