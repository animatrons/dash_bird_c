import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from 'src/app/core/models/User';

@Component({
  standalone: true,
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass'],
  imports: [
    FormsModule
  ]
})
export class SigninComponent implements OnInit {
  user: User = new User();
  constructor() { }

  ngOnInit(): void {
  }

  onSubmitTemplateBased() {
    console.log('User credentials submitted: ', this.user)
  }

}
