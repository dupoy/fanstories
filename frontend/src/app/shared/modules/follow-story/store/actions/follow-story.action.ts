import { IStory } from 'src/app/shared/types/story.interface';

import { createAction, props } from '@ngrx/store';

import { ActionTypes } from '../action-types';

export const followStoryAction = createAction(
  ActionTypes.FOLLOW_STORY,
  props<{isFollow: boolean; slug: string}>()
)

export const followStorySuccessAction = createAction(
  ActionTypes.FOLLOW_STORY_SUCCESS,
  props<{story: IStory}>()
)

export const followStoryFailureAction = createAction(
  ActionTypes.FOLLOW_STORY_FAILURE
)
