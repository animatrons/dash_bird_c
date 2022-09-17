import { createAction, props } from '@ngrx/store';
import { BusinessError, TechnicalError } from 'src/app/core/models/Error';
import { User } from 'src/app/core/models/User';

export const userAuth = createAction(
  '[Auth] User Auth',
  props<{ email: string, password: string }>()
);

export const userAuthSuccess = createAction(
  '[Auth] User Auth Success',
  props<{ user: User }>()
);

export const userAuthFailure = createAction(
  '[Auth] User Auth Failure',
  props<{ error: TechnicalError | BusinessError }>()
);

export const userLogOut = createAction(
  '[Auth] User Log Out'
)
