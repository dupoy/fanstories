import { Action, createReducer, on } from '@ngrx/store';

import { IFandomsState } from '../types/fandoms-state.interface';
import {
    getFandomsAction, getFandomsFailureAction, getFandomsSuccessAction
} from './actions/get-fandoms.action';

const initialState: IFandomsState = {
  isLoading: false,
  backendError: null,
  data: null,
}

const fandomReducer = createReducer(
  initialState,
  on(getFandomsAction, (state: IFandomsState) => ({...state, isLoading: true})),
  on(getFandomsSuccessAction, (state: IFandomsState, action) => ({
    ...state,
    isLoading: false,
    data: action.data,
  })),
  on(getFandomsFailureAction, (state: IFandomsState) => ({
    ...state,
    isLoading: false,
  }))
)

export function reducer(state: IFandomsState, action: Action) {
  return fandomReducer(state, action)
}
