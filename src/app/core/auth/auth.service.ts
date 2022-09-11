import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, retry, tap, timeout } from 'rxjs';
import { RequestService } from '../http/request.service';
import { User } from '../models/User';
import { PersistenceService } from '../services/persistence.service';

const REGISTERED_USERS_EXPL: User[] = [
  {
    id: '496',
    email: 'osman@dot.com',
    password: 'secret',
    firstName: 'osman',
    lastName: 'osmani'
  },
  {
    id: '496',
    email: 'hajib@dot.com',
    password: 'secret',
    firstName: 'hajib',
    lastName: 'mahjoub'
  }
]

@Injectable()
export class AuthService {
  private loggedInUser: User | undefined;
  private TOKEN_STORAGE_KEY = 'access_token';

  private isLoggedInSource = new BehaviorSubject<boolean>(false);
  private isLoggedInCurrent = this.isLoggedInSource.asObservable();

  constructor(private httpService: RequestService,
    private persistenceService: PersistenceService) { }

  login(email: string, password: string): Observable<User | undefined> {
    const user = REGISTERED_USERS_EXPL.find(user =>
      user.email.toLowerCase() === email.trim().toLowerCase()
      && user.password === password)
    //
    let login$ = new Observable<User | undefined>()
    login$ = of(user)
      .pipe(
        timeout(2000),
        retry(1),
        tap(v => {
          this.loggedInUser = v;
          if (v === undefined) {
            this.changeAuthState(false);
            throw new Error("User is invalid bro, check your credientials, are you even registered?");
          }
          this.changeAuthState(true);
          // TODO: remove password from loggedInUser object
          console.log('Got login result, let\'s see if it\'s a valid user: ', v);
        }),
      )
    return login$;
  }

  logOut() {
    this.loggedInUser = undefined;
    this.changeAuthState(false);
    this.destroyToken();
  }

  isUserLoggedIn() {
    return this.loggedInUser !== undefined;
  }

  changeAuthState(isLoggedIn: boolean) {
    this.isLoggedInSource.next(isLoggedIn);
  }

  onAuthStateChange() {
    return this.isLoggedInCurrent;
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
