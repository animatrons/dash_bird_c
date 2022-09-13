import { Injectable } from '@angular/core';
import { delay } from 'rxjs';
import { HttpOptionsDTO } from 'src/app/core/http/HttpOptionsDTO';
import { RequestService } from 'src/app/core/http/request.service';
import { PostInterface } from '../types/post.interface';

@Injectable()
export class PostsService {
  private uri = 'posts';

  constructor(private httpService: RequestService) { }

  getAll() {
    return this.httpService
      .get<PostInterface[]>(this.uri)
      .pipe(delay(3000))
  }

  getByUser(userId: string) {
    const httpOptions = (new HttpOptionsDTO())
      .addParam('userId', userId);
    return this.httpService
      .get<PostInterface[]>(this.uri, httpOptions)
      .pipe(delay(3000));
  }

}
