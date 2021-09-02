import { Action, createReducer, on } from '@ngrx/store';

import { IRatingsState } from '../types/ratings-state.interface';
import {
    getRatingsAction, getRatingsFailureAction, getRatingsSuccessAction
} from './actions/get-ratings.action';

const initialState: IRatingsState = {
  isLoading: false,
  backendErrors: null,
  ratings: null,
}

const ratingsReduces = createReducer(
  initialState,
  on(getRatingsAction, (state: IRatingsState) => ({...state, isLoading: true})),
  on(getRatingsSuccessAction, (state: IRatingsState, action) => ({
    ...state,
    ratings: action.ratings,
    isLoading: false,
  })),
  on(getRatingsFailureAction, (state: IRatingsState) => ({
    ...state,
    isLoading: false,
  }))
)

export function reducer(state: IRatingsState, action: Action) {
  return ratingsReduces(state, action)
}
