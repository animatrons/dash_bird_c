import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass']
})
export class LoginFormComponent implements OnInit {
  user: User = new User();
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {

  }

}
