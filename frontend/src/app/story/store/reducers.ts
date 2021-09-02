import { Action, createReducer, on } from '@ngrx/store';

import { IStoryState } from '../types/story-state';
import { deleteStorySuccessAction } from './actions/delete-story.action';
import {
    getStoryAction, getStoryFailureAction, getStorySuccessAction
} from './actions/get-story.action';

const initialState: IStoryState = {
  isLoading: false,
  backendError: null,
  story: null,
}

const storyReducer = createReducer(
  initialState,
  on(getStoryAction, (state: IStoryState) => ({...state, isLoading: true})),
  on(getStorySuccessAction, (state: IStoryState, action) => ({
    ...state,
    isLoading: false,
    story: action.story,
  })),
  on(getStoryFailureAction, (state: IStoryState) => ({
    ...state,
    isLoading: false,
  })),
  on(deleteStorySuccessAction, (state: IStoryState) => ({...initialState}))
)

export function reducer(state: IStoryState, action: Action) {
  return storyReducer(state, action)
}
