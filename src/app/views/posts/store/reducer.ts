import { createReducer, on } from "@ngrx/store";
import * as PostsActions from "./actions";
import { TechnicalError } from "src/app/core/models/Error";
import { PostInterface } from '../types/post.interface';

export const postsFeatureKey = 'posts';

export interface State {
  loadStatus: "NOT_LOADED" | "LOADING" | "LOADED";
  updatedAt: number,
  posts: PostInterface[];
  error: TechnicalError | null;
}

export const initialState: State = {
  loadStatus: "NOT_LOADED",
  updatedAt: Date.now(),
  posts: [],
  error: null
}

export const reducers = createReducer(
    initialState,
    // on(ActionToReactOn, function that returns a new state based on the previous)
    on(PostsActions.loadPosts, (state) => ({
      ...state,
      loadStatus: "LOADING"
    })),
    on(PostsActions.loadPostsSuccess, (state, action) => ({
      ...state,
      loadStatus: "LOADED",
      updatedAt: Date.now(),
      posts: action.posts
    })),
    on(PostsActions.loadPostsFailure, (state, action) => ({
      ...state,
      loadStatus: "NOT_LOADED",
      error: action.error
    }))
  )
