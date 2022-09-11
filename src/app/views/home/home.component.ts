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
  currentUser: User | undefined = new User();
  authSub: Subscription = new Subscription;
  constructor
    (
      private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.authSub = this.authService.onAuthStateChange()
      .subscribe(authState => {
        this.isSignedIn = authState;
        if (authState) {
          this.currentUser = this.authService.getLoggedInUser();
        }
      })
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

}
