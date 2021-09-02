import { IChapter } from 'src/app/shared/types/chapter.interface';

import { createAction, props } from '@ngrx/store';

import { IChapterRequest } from '../../types/chapter-request.interface';
import { ActionTypes } from '../action-type';

export const createChapterAction = createAction(
  ActionTypes.CREATE_CHAPTER_ACTION,
  props<{slug: string; chapter: IChapterRequest}>()
)

export const createChapterSuccessAction = createAction(
  ActionTypes.CREATE_CHAPTER_ACTION_SUCCESS,
  props<{chapter: IChapter}>()
)

export const createChapterFailureAction = createAction(
  ActionTypes.CREATE_CHAPTER_ACTION_FAILURE
)
