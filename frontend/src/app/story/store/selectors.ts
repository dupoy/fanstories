import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAppState } from '../../shared/types/app-state.interface';
import { IStoryState } from '../types/story-state';

const getStoryFeatureSelector = createFeatureSelector<IAppState, IStoryState>(
  'story'
)

export const isLoadingSelector = createSelector(
  getStoryFeatureSelector,
  (storyState: IStoryState) => storyState.isLoading
)

export const backendErrorSelector = createSelector(
  getStoryFeatureSelector,
  (storyState: IStoryState) => storyState.backendError
)

export const storySelector = createSelector(
  getStoryFeatureSelector,
  (storyState: IStoryState) => storyState.story
)
