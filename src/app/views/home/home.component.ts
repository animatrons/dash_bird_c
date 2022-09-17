import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { User } from 'src/app/core/models/User';
import { AppState } from 'src/app/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isSignedIn: boolean = false;

  loginStatus$: Observable<"NOT_LOGGED_IN" | "LOGIN_IN" | "LOGGED_IN"> = new Observable();

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    console.log('Home init');
  }

  ngOnDestroy(): void {
    console.log('Home gone');
  }

}
