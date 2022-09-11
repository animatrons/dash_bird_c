import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from 'src/app/core/models/User';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    AuthService,
  ],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit {
  user: User = new User();
  isLoading: boolean = false;
  loggInError = false;

  constructor
    (
      private authService: AuthService
    ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('User credentials submitted: ', this.user);
    this.isLoading = true;
    this.authService.login(
      this.user.email,
      this.user.password
    ).subscribe({
      next: (user) => {
        console.log('Welcome back sir/madame: ', user);
        this.loggInError = false;
        // this.messagingService.push(new MessageDTO(user, false));
      },
      error: (err) => {
        console.error('Identity unregistered, invalid or rejcted', err);
        this.loggInError = true;
        // this.messagingService.push(new MessageDTO(err, true));
      },
      complete: () => {
        this.user = new User();
        this.isLoading = false;
      }
    })
  }

}
