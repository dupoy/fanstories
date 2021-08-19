import { routerNavigationAction } from '@ngrx/router-store';
import { Action, createReducer, on } from '@ngrx/store';

import { IStoriesState } from '../types/stories-state.interface';
import {
    getStoriesAction, getStoriesFailureAction, getStoriesSuccessAction
} from './actions/get-stories.action';

const initialState: IStoriesState = {
  isLoading: false,
  error: null,
  data: null,
}

const storiesReducer = createReducer(
  initialState,
  on(
    getStoriesAction,
    (state): IStoriesState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getStoriesSuccessAction,
    (state, action): IStoriesState => ({
      ...state,
      isLoading: false,
      data: action.stories,
    })
  ),
  on(
    getStoriesFailureAction,
    (state): IStoriesState => ({
      ...state,
      isLoading: false,
    })
  ),
  on(routerNavigationAction, (): IStoriesState => initialState)
)

export function reducer(state: IStoriesState, action: Action) {
  return storiesReducer(state, action)
}
