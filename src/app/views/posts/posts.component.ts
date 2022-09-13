import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TechnicalError } from 'src/app/core/models/Error';
import { AppStateInterface } from 'src/app/types/app-state.interface';
import * as PostsActions from "./store/actions";
import { fromPosts } from './store/selectors';
import { PostInterface } from './types/post.interface';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass']
})
export class PostsComponent implements OnInit {
  // isLoading$: Observable<boolean>;
  loadStatus$: Observable<"NOT_LOADED" | "LOADING" | "LOADED">;
  posts$: Observable<PostInterface[]>;
  error$: Observable<TechnicalError | null>;

  constructor(private store: Store<AppStateInterface>) {
    this.loadStatus$ = this.store.pipe<"NOT_LOADED" | "LOADING" | "LOADED">(select(fromPosts.loadStatusSelector));
    this.posts$ = this.store.pipe<PostInterface[]>(select(fromPosts.postsSelector));
    this.error$ = this.store.pipe<TechnicalError | null>(select(fromPosts.errorSelector));
  }

  ngOnInit(): void {
    // dispatch the Get Posts action
    this.store.dispatch(PostsActions.getPosts());
  }

}
