import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, mergeMap, tap, share } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as AuthActions from '../actions/auth.actions';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AlertService } from 'src/app/core/utils/alert.service';
import { Router } from '@angular/router';


@Injectable()
export class AuthEffects {

  userAuthinAuth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.userAuth),
      concatMap((data) => {
        let login$ = this.authService.login_(data.email, data.password).pipe(share());
        let alertAutoClose$ = login$.pipe(map(() => true), catchError(() => of(true)));
        this.alertService.loading('Loggin you in', alertAutoClose$, {title: 'Be patient'});

        return login$
          .pipe(
            map((response) => AuthActions.userAuthSuccess({user: response.user})),
            catchError((err) => of(AuthActions.userAuthFailure({ error: err })))
          )
      })
    );
  });

  userAuthSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.userAuthSuccess),
      tap((data) => {
        this.alertService.success(`Welcome back ${data.user.firstName}`, {title: 'Login successful', autoClose: true});
        setTimeout(() => this.router.navigate(['']), 1000);
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
        } else {
          this.alertService.danger('We have a problem', {title: 'Internal error'});
        }
      })
    )},
    { dispatch: false }
  );

  userLogOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.userLogOut),
      concatMap(() => {
        return this.authService.logOut()
          .pipe(
            map(() => AuthActions.userLogOutSuccess()),
            catchError(() => of(AuthActions.userLogOutFailure()))
          )
      })
    )}
  )

  userLogOutSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.userLogOutSuccess),
      tap(() => {
        this.alertService.info(`See you later`, {title: 'Log out', autoClose: true});
        setTimeout(() => this.router.navigate(['']), 1000);
      })
    )},
    { dispatch: false }
  )

  userLogOutFailed$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.userLogOutFailure),
      tap(() => {
        this.alertService.danger(`Error logout`, {title: 'ERROR'})
      })
    )},
    { dispatch: false }
  )

  constructor(private actions$: Actions, private authService: AuthService,
    private alertService: AlertService, private router: Router) {}
}
