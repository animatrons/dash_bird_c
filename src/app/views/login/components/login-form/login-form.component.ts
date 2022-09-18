import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { BusinessError, TechnicalError } from 'src/app/core/models/Error';
import { User } from 'src/app/core/models/User';
import { AppState } from "../../../../store/index";
import * as fromAuth from "../../../../store/selectors/auth.selectors";
import * as AuthActions from "../../../../store/actions/auth.actions";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass']
})
export class LoginFormComponent implements OnInit {
  user: User = new User();
  loadingStatus$: Observable<'NOT_LOGGED_IN' | 'LOGIN_IN' | 'LOGGED_IN'> = new Observable();
  error$: Observable<{message: string, is: boolean} | null> = new Observable();

  constructor(private store: Store<AppState>) {
    this.loadingStatus$ = store.pipe(select(fromAuth.selectLoadingStatus));
    this.error$ = store.pipe<TechnicalError | BusinessError | null>(select(fromAuth.selectError))
      .pipe(
        map((err) => ({message: err?.code === 403 ? 'Wrong email or password' : 'UNKOWN ERROR', is: err ? true : false}))
      );
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.store.dispatch(AuthActions.userAuth({email: this.user.email, password: this.user.password}));
  }

}
