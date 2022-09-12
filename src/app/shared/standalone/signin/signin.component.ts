import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from 'src/app/core/models/User';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass'],
})
export class SigninComponent implements OnInit {
  user: User = new User();
  isLoading: boolean = false;
  loggInError = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initState();
  }

  onSubmit() {
    console.log('User credentials submitted: ', this.user);
    this.loadingState();
    this.authService.login_(this.user.email, this.user.password).subscribe({
      next: (user) => {
        console.log('Welcome back sir/madame: ', user);
        this.initState();
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error('Identity unregistered, invalid or rejcted');
        this.errorState();
      },
    });
  }

  initState() {
    this.user = new User();
    this.isLoading = false;
    this.loggInError = false;
  }

  loadingState() {
    this.isLoading = true;
    this.loggInError = false;
  }

  errorState() {
    this.loggInError = true;
    this.isLoading = false;
  }

}
