import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TechnicalError } from 'src/app/core/models/Error';
import { AlertService } from 'src/app/core/utils/alert.service';
import { AppState } from 'src/app/store/index';
import * as PostsActions from "./store/actions";
import { fromPosts } from './store/selectors';
import { PostInterface } from './types/post.interface';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass']
})
export class PostsComponent implements OnInit {
  loadStatus$: Observable<"NOT_LOADED" | "LOADING" | "LOADED">;
  posts$: Observable<PostInterface[]>;
  error$: Observable<TechnicalError | null>;

  constructor(private store: Store<AppState>, private alertService: AlertService) {
    this.loadStatus$ = this.store.pipe<"NOT_LOADED" | "LOADING" | "LOADED">(select(fromPosts.selectLoadStatus));
    this.posts$ = this.store.pipe<PostInterface[]>(select(fromPosts.selectAllPosts));
    this.error$ = this.store.pipe<TechnicalError | null>(select(fromPosts.selectError));
  }

  ngOnInit(): void {
    // dispatch the Get Posts action
    this.store.dispatch(PostsActions.getPosts());
  }

}
