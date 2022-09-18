import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import * as fromAuth from '../../../../store/selectors/auth.selectors';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass']
})
export class WelcomeComponent implements OnInit {
  loginStatus$: Observable<"NOT_LOGGED_IN" | "LOGIN_IN" | "LOGGED_IN"> = new Observable();

  constructor(private store: Store<AppState>) {
    this.loginStatus$ = store.pipe(select(fromAuth.selectLoadingStatus));
  }

  ngOnInit(): void {
  }

}
