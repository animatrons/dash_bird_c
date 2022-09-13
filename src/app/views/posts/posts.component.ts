import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TechnicalError } from 'src/app/core/models/Error';
import { AppStateInterface } from 'src/app/types/app-state.interface';
import * as PostsActions from "./store/actions";
import { errorSelector, isLoadingSelector, postsSelector } from './store/selectors';
import { PostInterface } from './types/post.interface';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass']
})
export class PostsComponent implements OnInit {
  isLoading$: Observable<boolean>;
  posts$: Observable<PostInterface[]>;
  error$: Observable<TechnicalError | null>;

  constructor(private store: Store<AppStateInterface>) {
    this.isLoading$ = this.store.pipe<boolean>(select(isLoadingSelector));
    this.posts$ = this.store.pipe<PostInterface[]>(select(postsSelector));
    this.error$ = this.store.pipe<TechnicalError | null>(select(errorSelector));
  }

  ngOnInit(): void {
    // dispatch the Get Posts action
    this.store.dispatch(PostsActions.loadPosts());
  }

}
