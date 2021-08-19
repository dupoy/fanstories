import { IAppState } from 'src/app/shared/types/app-state.interface';

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IStoriesState } from '../types/stories-state.interface';

export const storiesFeatureSelector = createFeatureSelector<
  IAppState,
  IStoriesState
>('stories')

export const isLoadingSelector = createSelector(
  storiesFeatureSelector,
  (storiesState: IStoriesState) => storiesState.isLoading
)

export const storiesSelector = createSelector(
  storiesFeatureSelector,
  (storiesState: IStoriesState) => storiesState.data
)

export const errorSelector = createSelector(
  storiesFeatureSelector,
  (storiesState: IStoriesState) => storiesState.error
)
