import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAppState } from '../../shared/types/app-state.interface';
import { IChapterState } from '../types/chapter-state.interface';

const chapterFeatureSelector = createFeatureSelector<IAppState, IChapterState>(
  'chapter'
)

export const isLoadingSelector = createSelector(
  chapterFeatureSelector,
  (chapterState: IChapterState) => chapterState.isLoading
)

export const backendErrorSelector = createSelector(
  chapterFeatureSelector,
  (chapterState: IChapterState) => chapterState.backendError
)

export const chapterSelector = createSelector(
  chapterFeatureSelector,
  (chapterState: IChapterState) => chapterState.chapter
)
