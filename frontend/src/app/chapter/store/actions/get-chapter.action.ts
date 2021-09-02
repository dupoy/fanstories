import { IChapter } from 'src/app/shared/types/chapter.interface';

import { createAction, props } from '@ngrx/store';

import { ActionTypes } from '../action-type';

export const getChapterAction = createAction(
  ActionTypes.GET_CHAPTER_ACTION,
  props<{storySlug: string; chapterSlug: string}>()
)

export const getChapterSuccessAction = createAction(
  ActionTypes.GET_CHAPTER_ACTION_SUCCESS,
  props<{chapter: IChapter}>()
)

export const getChapterFailureAction = createAction(
  ActionTypes.GET_CHAPTER_ACTION_FAILURE
)
