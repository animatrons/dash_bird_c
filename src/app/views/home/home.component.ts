import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    console.log('Home init');
  }

  ngOnDestroy(): void {
    console.log('Home gone');
  }

}
