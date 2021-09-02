import { Action, createReducer, on } from '@ngrx/store';

import { IFocusesState } from '../types/focuses-state.interface';
import {
    getFocusesAction, getFocusesFailureAction, getFocusesSuccessAction
} from './actions/get-focuses.action';

const initialState: IFocusesState = {
  isLoading: false,
  backendErrors: null,
  focuses: null,
}

const focusesReduces = createReducer(
  initialState,
  on(getFocusesAction, (state: IFocusesState) => ({...state, isLoading: true})),
  on(getFocusesSuccessAction, (state: IFocusesState, action) => ({
    ...state,
    focuses: action.focuses,
    isLoading: false,
  })),
  on(getFocusesFailureAction, (state: IFocusesState) => ({
    ...state,
    isLoading: false,
  }))
)

export function reducer(state: IFocusesState, action: Action) {
  return focusesReduces(state, action)
}
