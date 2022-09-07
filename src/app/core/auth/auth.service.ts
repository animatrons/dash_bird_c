import { Injectable } from '@angular/core';
import { RequestService } from '../http/request.service';
import { User } from '../models/User';

@Injectable()
export class AuthService {
  private loggedInUser: User | undefined;
  private tokenKey = 'access_token';
  constructor(private httpService: RequestService) { }

  login() {

  }

  logOut() {
    this.destroyToken();
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  private destroyToken() {
    localStorage.removeItem(this.tokenKey);
  }

  isUserLoggedIn() {
    return this.loggedInUser !== undefined;
  }

}
