import { Component, OnInit } from '@angular/core';
import * as fromAuth from '../../../../store/selectors/auth.selectors';
import { AppState } from 'src/app/store';
import { User } from 'src/app/core/models/User';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-profile',
  templateUrl: './home-profile.component.html',
  styleUrls: ['./home-profile.component.sass']
})
export class HomeProfileComponent implements OnInit {
  currentUser$: Observable<User | null> = new Observable();
  currentUser: User | null = new User();

  constructor(private store: Store<AppState>) {
    store.select(fromAuth.selectUser).subscribe((user) => {
      this.currentUser = user;
    })
  }

  ngOnInit(): void {
  }

}
