import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromAuth from '../../../../store/selectors/auth.selectors';
import * as AuthActions from '../../../../store/actions/auth.actions';
import { AppState } from 'src/app/store';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.sass']
})
export class HomeHeaderComponent implements OnInit {
  loginStatus$: Observable<"NOT_LOGGED_IN" | "LOGIN_IN" | "LOGGED_IN"> = new Observable();
  active = 'home';
  public isMenuCollapsed = true;

  constructor(private store: Store<AppState>, private router: Router) {
    this.loginStatus$ = store.pipe(select(fromAuth.selectLoadingStatus));
  }

  ngOnInit(): void {
  }

  logOut() {
    this.store.dispatch(AuthActions.userLogOut());
    this.router.navigate(['']);
  }

  navigate(path: string) {
    this.router.navigate(['home/welcome', path]);
  }

}
