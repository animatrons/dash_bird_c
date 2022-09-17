import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);

export const selectLoadingStatus = createSelector(
  selectAuthState,
  (state) => state.loginStatus
);

export const selectError = createSelector(
  selectAuthState,
  (state) => state.error
);
