import { IAppState } from 'src/app/shared/types/app-state.interface';

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAuthState } from '../types/auth-state.interface';

export const authFeatureSelector = createFeatureSelector<IAppState, IAuthState>(
  'auth'
)

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.isSubmitting
)

export const backendErrorsSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.backendErrors
)

export const isLoggedInSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.isLoggedIn
)

export const isAnonymousSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.isLoggedIn === false
)

export const currentUserSelector = createSelector(
  authFeatureSelector,
  (authState: IAuthState) => authState.currentUser
)
