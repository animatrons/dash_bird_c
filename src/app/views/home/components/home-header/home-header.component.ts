import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.sass']
})
export class HomeHeaderComponent implements OnInit {
  @Input() isSignedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSignOutButtonClicked() {
    this.authService.logOut();
    this.router.navigate(['']);
  }

}
