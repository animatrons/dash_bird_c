import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-petit',
  templateUrl: './login-petit.component.html',
  styleUrls: ['./login-petit.component.sass']
})
export class LoginPetitComponent implements OnInit {
  @Input() h_100: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
