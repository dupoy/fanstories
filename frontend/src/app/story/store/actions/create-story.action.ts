import { createAction, props } from '@ngrx/store';

import {
    IBackendErrors
} from '../../../shared/modules/backend-errors/types/backend-errors.interface';
import { IStory } from '../../../shared/types/story.interface';
import { IStoryRequest } from '../../types/story-request.interface';
import { ActionTypes } from '../action-types';

export const createStoryAction = createAction(
  ActionTypes.CREATE_STORY_ACTION,
  props<{story: IStoryRequest}>()
)

export const createStorySuccessAction = createAction(
  ActionTypes.CREATE_STORY_ACTION_SUCCESS,
  props<{story: IStory}>()
)

export const createStoryFailureAction = createAction(
  ActionTypes.CREATE_STORY_ACTION_FAILURE,
  props<{backendErrors: IBackendErrors}>()
)
