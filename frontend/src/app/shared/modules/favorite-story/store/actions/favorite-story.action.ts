import { createAction, props } from '@ngrx/store';

import { IStory } from '../../../../types/story.interface';
import { ActionTypes } from '../action-types';

export const favoriteStoryAction = createAction(
  ActionTypes.FAVORITE_STORY,
  props<{isFavorite: boolean; slug: string}>()
)

export const favoriteStorySuccessAction = createAction(
  ActionTypes.FAVORITE_STORY_SUCCESS,
  props<{story: IStory}>()
)

export const favoriteStoryFailureAction = createAction(
  ActionTypes.FAVORITE_STORY_FAILURE
)
