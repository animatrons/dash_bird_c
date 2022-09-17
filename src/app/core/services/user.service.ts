import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, of, retry, tap, throwError } from 'rxjs';
import { HttpOptionsDTO } from '../http/HttpOptionsDTO';
import { RequestService } from '../http/request.service';
import { BusinessError, TechnicalError } from '../models/Error';
import { ResponseDTO } from '../models/ResponseDTO.interface';
import { User } from '../models/User';

@Injectable()
export class UserService {
  private uri = 'users';
  constructor(private requestSetvice: RequestService) { }

  getByEmailAndPassword(email: string, password: string) {
    const httpOptions = (new HttpOptionsDTO())
      .addParam('email', email)
      .addParam('password', password);
    // TODO: add a response DTO for http requests, must have a status prop and message
    return this.requestSetvice
      .get<User[]>(
        this.uri,
        httpOptions
      )
      .pipe(
        delay(3000),
        retry(1),
        map((v) => {
          if (v == undefined) {
            throw new TechnicalError('NO RESPONSE SENT', 500);
          }
          if (v.length === 0) {
            return new ResponseDTO<null>(null, 404, 'USER NOT FOUND');
          }
          return new ResponseDTO<User>(v[0], 200, 'OK');
        }),
        catchError((err: TechnicalError | BusinessError) => {
          console.error('SOMETHING WENT WRONG IN: UserService.getByEmailAndPassword', [err]);
          if (err instanceof HttpErrorResponse) {
            throw new TechnicalError('HTTP ERROR', 500);
          }
          return throwError(() => err);
        })
      );
  }

  getById(id: string) {
    const httpOptions = (new HttpOptionsDTO()).addParam('id', id)
    return this.requestSetvice
      .get<User[]>(
        this.uri,
        httpOptions);
  }
}
