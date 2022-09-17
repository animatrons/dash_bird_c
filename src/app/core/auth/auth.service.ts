import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, map, Observable, of, retry, share, single, switchMap, tap, timeout } from 'rxjs';
import { BusinessError } from '../models/Error';
import { ILoginResponse } from '../models/loginResponse.interface';
import { User } from '../models/User';
import { PersistenceService } from '../services/persistence.service';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthService {
  private TOKEN_STORAGE_KEY = 'access_token';

  constructor
    (
      private userService: UserService,
      private persistenceService: PersistenceService
    ) { }

  login_(email: string, password: string): Observable<ILoginResponse> {
    return this.userService
      .getByEmailAndPassword(email, password)
      .pipe(
        map((response) => {
          console.log('Got login result, let\'s see if it\'s a valid user: ', response);
          if (response.status === 404) {
            throw new BusinessError('USER NOT REGISTERED', 403);
          }
          let user: User = {...(response.data as User), password: ''};
          let loginResponse: ILoginResponse = {user, success: true};
          return loginResponse;
        })
      )
  }

  logOut() {
    this.destroyToken();
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
