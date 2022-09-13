import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/types/app-state.interface';
import * as PostsActions from "./store/actions";
import { isLoadingSelector } from './store/selectors';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass']
})
export class PostsComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(private store: Store<AppStateInterface>) {
    this.isLoading$ = this.store.pipe<boolean>(select(isLoadingSelector));
  }

  ngOnInit(): void {
    // dispatch the Get Posts action
    this.store.dispatch(PostsActions.getPosts());
  }

}
