import { createAction, props } from '@ngrx/store';

import {
    IBackendErrors
} from '../../../shared/modules/backend-errors/types/backend-errors.interface';
import { IStory } from '../../../shared/types/story.interface';
import { IStoryRequest } from '../../types/story-request.interface';
import { ActionTypes } from '../action-types';

export const updateStoryAction = createAction(
  ActionTypes.UPDATE_STORY_ACTION,
  props<{slug: string; story: IStoryRequest}>()
)

export const updateStorySuccessAction = createAction(
  ActionTypes.UPDATE_STORY_ACTION_SUCCESS,
  props<{story: IStory}>()
)

export const updateStoryFailureAction = createAction(
  ActionTypes.UPDATE_STORY_ACTION_FAILURE,
  props<{backendErrors: IBackendErrors}>()
)
