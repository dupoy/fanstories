import { IAppState } from 'src/app/shared/types/app-state.interface';

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IRatingsState } from '../types/ratings-state.interface';

const getRatingsFeatureSelector = createFeatureSelector<
  IAppState,
  IRatingsState
>('ratings')

export const isLoadingSelector = createSelector(
  getRatingsFeatureSelector,
  (ratingsState: IRatingsState) => ratingsState.isLoading
)

export const backendErrorsSelector = createSelector(
  getRatingsFeatureSelector,
  (ratingsState: IRatingsState) => ratingsState.backendErrors
)

export const ratingsSelector = createSelector(
  getRatingsFeatureSelector,
  (ratingsState: IRatingsState) => ratingsState.ratings
)
