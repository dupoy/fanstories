import { IAppState } from 'src/app/shared/types/app-state.interface';

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ITagsState } from '../types/tags-state.interface';

const getTagsFeatureSelector = createFeatureSelector<IAppState, ITagsState>(
  'tags'
)

export const isLoadingSelector = createSelector(
  getTagsFeatureSelector,
  (tagsState: ITagsState) => tagsState.isLoading
)

export const backendErrorsSelector = createSelector(
  getTagsFeatureSelector,
  (tagsState: ITagsState) => tagsState.backendErrors
)

export const tagsSelector = createSelector(
  getTagsFeatureSelector,
  (tagsState: ITagsState) => tagsState.data
)
