import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as AuthActions from '../actions/auth.actions';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AlertService } from 'src/app/core/utils/alert.service';


@Injectable()
export class AuthEffects {

  userAuthinAuth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.userAuth),
      concatMap((data) =>
        this.authService.login_(data.email, data.password)
          .pipe(
            map((response) => AuthActions.userAuthSuccess({user: response.user})),
            catchError((err) => of(AuthActions.userAuthFailure({ error: err })))
          )
      )
    );
  });

  userAuthSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.userAuthSuccess),
      tap((data) => {
        this.alertService.success(`Welcome back ${data.user.firstName}`, {title: 'Login successful', autoClose: true})
      })
    )},
    { dispatch: false }
  )

  userAuthFailed$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.userAuthFailure),
      tap((data) => {
        if (data.error?.code === 403) {
          this.alertService.danger('Wrong email or password', {title: 'Login denied'});
        }
        if (data.error?.code === 500) {
          this.alertService.danger('We have a problem', {title: 'Internal error'});
        }
      })
    )},
    { dispatch: false }
  )


  constructor(private actions$: Actions, private authService: AuthService, private alertService: AlertService) {}
}
