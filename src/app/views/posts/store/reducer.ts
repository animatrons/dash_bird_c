import { createReducer, on } from "@ngrx/store";
import { PostStateInterface } from "../types/post-state.interface";
import * as PostsActions from "./actions";

export const initialState: PostStateInterface = {
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
