import { IAppState } from 'src/app/shared/types/app-state.interface';

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IFandomsState } from '../types/fandoms-state.interface';

const fandomFeatureSelector = createFeatureSelector<IAppState, IFandomsState>(
  'fandoms'
)

export const isLoadingSelector = createSelector(
  fandomFeatureSelector,
  (fandomsState: IFandomsState) => fandomsState.isLoading
)

export const backendErrorsSelector = createSelector(
  fandomFeatureSelector,
  (fandomsState: IFandomsState) => fandomsState.backendError
)

export const fandomsSelector = createSelector(
  fandomFeatureSelector,
  (fandomsState: IFandomsState) => fandomsState.data
)
