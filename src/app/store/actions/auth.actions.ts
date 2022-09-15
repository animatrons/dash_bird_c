import { createAction, props } from '@ngrx/store';

export const userAuth = createAction(
  '[Auth] User Auth'
);

export const userAuthSuccess = createAction(
  '[Auth] User Auth Success',
  props<{ data: any }>()
);

export const userAuthFailure = createAction(
  '[Auth] User Auth Failure',
  props<{ error: any }>()
);
