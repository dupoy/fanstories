import { IChapter } from 'src/app/shared/types/chapter.interface';

import { createAction, props } from '@ngrx/store';

import { IChapterRequest } from '../../types/chapter-request.interface';
import { ActionTypes } from '../action-type';

export const updateChapterAction = createAction(
  ActionTypes.UPDATE_CHAPTER_ACTION,
  props<{storySlug: string; chapterSlug: string; chapter: IChapterRequest}>()
)

export const updateChapterSuccessAction = createAction(
  ActionTypes.UPDATE_CHAPTER_ACTION_SUCCESS,
  props<{chapter: IChapter}>()
)

export const updateChapterFailureAction = createAction(
  ActionTypes.UPDATE_CHAPTER_ACTION_FAILURE
)
