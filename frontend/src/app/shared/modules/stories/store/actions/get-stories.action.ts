import { createAction, props } from '@ngrx/store';

import { IGetStoriesResponse } from '../../types/get-stories-response.interface';
import { ActionTypes } from '../action-types';

export const getStoriesAction = createAction(
  ActionTypes.GET_STORIES,
  props<{url: string}>()
)

export const getStoriesSuccessAction = createAction(
  ActionTypes.GET_STORIES_SUCCESS,
  props<{stories: IGetStoriesResponse}>()
)

export const getStoriesFailureAction = createAction(
  ActionTypes.GET_STORIES_FAILURE
)
