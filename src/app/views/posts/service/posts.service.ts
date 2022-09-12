import { Injectable } from '@angular/core';
import { delay } from 'rxjs';
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
}
