import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isSignedIn: boolean = false;
  currentUser: User = new User();
  authSub: Subscription = new Subscription;
  constructor
    (
      private authService: AuthService
    ) { }

  ngOnInit(): void {
    console.log('Home init');
    this.authSub = this.authService.isLoggedInCurrent
      .subscribe(authState => {
        console.log('auth state changed ', authState);
        this.isSignedIn = authState;
        if (authState) {
        }
      })
  }

  ngOnDestroy(): void {
    console.log('Home gone');
    this.authSub.unsubscribe();
  }

}
