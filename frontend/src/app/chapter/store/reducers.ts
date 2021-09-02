import { Action, createReducer, on } from '@ngrx/store';

import { IChapterState } from '../types/chapter-state.interface';
import {
    getChapterAction, getChapterFailureAction, getChapterSuccessAction
} from './actions/get-chapter.action';

const initialState: IChapterState = {
  isLoading: false,
  backendError: null,
  chapter: null,
}

const chapterReducer = createReducer(
  initialState,
  on(getChapterAction, (state: IChapterState) => ({...state, isLoading: true})),
  on(getChapterSuccessAction, (state: IChapterState, action) => ({
    ...state,
    chapter: action.chapter,
    isLoading: false,
  })),
  on(getChapterFailureAction, (state: IChapterState) => ({
    ...state,
    isLoading: false,
  }))
)

export function reducer(state: IChapterState, action: Action) {
  return chapterReducer(state, action)
}
