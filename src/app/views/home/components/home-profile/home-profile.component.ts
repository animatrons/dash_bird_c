import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-home-profile',
  templateUrl: './home-profile.component.html',
  styleUrls: ['./home-profile.component.sass']
})
export class HomeProfileComponent implements OnInit {
  currentUser!: User;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getLoggedInUser();
  }

}
