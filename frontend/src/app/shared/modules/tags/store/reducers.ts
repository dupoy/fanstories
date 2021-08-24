import { Action, createReducer, on } from '@ngrx/store';

import { ITagsState } from '../types/tags-state.interface';
import {
    getTagsActions, getTagsFailureActions, getTagsSuccessActions
} from './actions/get-tags.actions';

const initialState: ITagsState = {
  isLoading: false,
  backendErrors: null,
  data: null,
}

const tagsReducer = createReducer(
  initialState,
  on(getTagsActions, (state: ITagsState) => ({...state, isLoading: true})),
  on(getTagsSuccessActions, (state: ITagsState, actions) => ({
    ...state,
    isLoading: false,
    data: actions.tags,
  })),
  on(getTagsFailureActions, (state: ITagsState) => ({
    ...state,
    isLoading: false,
  }))
)

export function reducer(state: ITagsState, action: Action) {
  return tagsReducer(state, action)
}
