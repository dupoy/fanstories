import { IAppState } from 'src/app/shared/types/app-state.interface';

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IFocusesState } from '../types/focuses-state.interface';

const getFocusesFeatureSelector = createFeatureSelector<
  IAppState,
  IFocusesState
>('focuses')

export const isLoadingSelector = createSelector(
  getFocusesFeatureSelector,
  (focusesState: IFocusesState) => focusesState.isLoading
)

export const backendErrorsSelector = createSelector(
  getFocusesFeatureSelector,
  (focusesState: IFocusesState) => focusesState.backendErrors
)

export const focusesSelector = createSelector(
  getFocusesFeatureSelector,
  (focusesState: IFocusesState) => focusesState.focuses
)
