import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as AuthActions from '../actions/auth.actions';


@Injectable()
export class AuthEffects {

  loginAuths$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(AuthActions.userAuth),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => AuthActions.userAuthSuccess({ data })),
          catchError(error => of(AuthActions.userAuthFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
