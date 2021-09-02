import { createAction, props } from '@ngrx/store';

import { ActionTypes } from '../action-types';

export const deleteStoryAction = createAction(
  ActionTypes.DELETE_STORY_ACTION,
  props<{slug: string}>()
)

export const deleteStorySuccessAction = createAction(
  ActionTypes.DELETE_STORY_ACTION_SUCCESS
)

export const deleteStoryFailureAction = createAction(
  ActionTypes.DELETE_STORY_ACTION_FAILURE
)
