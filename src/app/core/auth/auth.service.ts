import { Inject, Injectable } from '@angular/core';
import { RequestService } from '../http/request.service';
import { User } from '../models/User';
import { PersistenceService } from '../services/persistence.service';

@Injectable()
export class AuthService {
  private loggedInUser: User | undefined;
  private tokenKey = 'access_token';
  constructor(private httpService: RequestService,
    @Inject(PersistenceService) private persistenceService: PersistenceService) { }

  login() {

  }

  logOut() {
    this.destroyToken();
  }

  setToken(token: string) {
    this.persistenceService.set(this.tokenKey, token);
  }

  getToken() {
    return this.persistenceService.get(this.tokenKey);
  }

  private destroyToken() {
    this.persistenceService.remove(this.tokenKey);
  }

  isUserLoggedIn() {
    return this.loggedInUser !== undefined;
  }

}
