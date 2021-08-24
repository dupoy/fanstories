import { createAction, props } from '@ngrx/store';

import { IGetTagsResponse } from '../../types/get-tags-response.interface';
import { ActionTypes } from '../action-types';

export const getTagsActions = createAction(ActionTypes.GET_TAG_ACTION)
export const getTagsSuccessActions = createAction(
  ActionTypes.GET_TAG_ACTION_SUCCESS,
  props<{tags: IGetTagsResponse}>()
)
export const getTagsFailureActions = createAction(
  ActionTypes.GET_TAG_ACTION_FAILURE
)
