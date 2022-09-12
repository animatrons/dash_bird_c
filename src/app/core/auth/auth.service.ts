import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, map, Observable, of, retry, share, single, switchMap, tap, timeout } from 'rxjs';
import { User } from '../models/User';
import { PersistenceService } from '../services/persistence.service';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthService {
  private loggedInUser: User = new User();
  private TOKEN_STORAGE_KEY = 'access_token';

  private isLoggedInSource = new BehaviorSubject<boolean>(false);
  public isLoggedInCurrent = this.isLoggedInSource.asObservable();

  constructor
    (
      private userService: UserService,
      private persistenceService: PersistenceService
    ) { }

  login_(email: string, password: string) {
    return this.userService
      .getByEmailAndPassword(email, password)
      .pipe(
        map((response) => {
          console.log('Got login result, let\'s see if it\'s a valid user: ', response);
          if (response.status === 500) {
            this.changeAuthState(false);
            throw new Error("We are currently having some serious problems internally, come back later, or never.");
          }
          if (response.status === 404) {
            this.changeAuthState(false);
            throw new Error("Your are either lost or an imposter, in both cases leave before i call the cops.");
          }
          if (response.status === 200) {
            this.loggedInUser = response.data;
            this.changeAuthState(true);
          }
          return this.loggedInUser;
        })
      )
  }

  logOut() {
    this.loggedInUser = new User();
    this.changeAuthState(false);
    this.destroyToken();
  }

  async isUserLoggedIn() {
    const state$ = this.onAuthStateChange().pipe(single());
    return await lastValueFrom(state$);
  }

  changeAuthState(isLoggedIn: boolean) {
    this.isLoggedInSource.next(isLoggedIn);
  }

  onAuthStateChange() {
    return this.isLoggedInCurrent.pipe(share());
  }

  getLoggedInUser() {
    return this.loggedInUser;
  }

  setToken(token: string) {
    this.persistenceService.set(this.TOKEN_STORAGE_KEY, token);
  }

  getToken() {
    return this.persistenceService.get(this.TOKEN_STORAGE_KEY);
  }

  private destroyToken() {
    this.persistenceService.remove(this.TOKEN_STORAGE_KEY);
  }
}
