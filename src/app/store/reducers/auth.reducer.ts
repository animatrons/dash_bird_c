import { Action, createReducer, on } from '@ngrx/store';
import { TechnicalError, BusinessError } from 'src/app/core/models/Error';
import { User } from 'src/app/core/models/User';
import * as AuthActions from '../actions/auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  user: User | null;
  loginStatus: 'NOT_LOGGED_IN' | 'LOGIN_IN' | 'LOGGED_IN';
  error: TechnicalError | BusinessError | null;
}

export const initialState: State = {
  user: null,
  loginStatus: 'NOT_LOGGED_IN',
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.userAuth, (state) => ({
    ...state,
    loginStatus: 'LOGIN_IN'
  })),
  on(AuthActions.userAuthSuccess, (state, action) => ({
    ...state,
    loginStatus: 'LOGGED_IN',
    user: action.user,
    error: null
  })),
  on(AuthActions.userAuthFailure, (state, action) => ({
    ...state,
    loginStatus: 'NOT_LOGGED_IN',
    user: null,
    error: action.error
  })),
  on(AuthActions.userLogOutSuccess, (state) => initialState),
);
