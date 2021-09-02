import { createAction, props } from '@ngrx/store';

import { IStory } from '../../../shared/types/story.interface';
import { ActionTypes } from '../action-types';

export const getStoryAction = createAction(
  ActionTypes.GET_STORY_ACTION,
  props<{slug: string}>()
)

export const getStorySuccessAction = createAction(
  ActionTypes.GET_STORY_ACTION_SUCCESS,
  props<{story: IStory}>()
)

export const getStoryFailureAction = createAction(
  ActionTypes.GET_STORY_ACTION_FAILURE
)
