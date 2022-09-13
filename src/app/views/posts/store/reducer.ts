import { createReducer, on } from "@ngrx/store";
import { PostStateInterface } from "../types/post-state.interface";
import * as PostsActions from "./actions";

export const initialState: PostStateInterface = {
  isLoading: false,
  posts: [],
  error: null
}

export const reducers = createReducer(
    initialState,
    // on(ActionToReactOn, function that returns a new state based on the previous)
    on(PostsActions.loadPosts, (state) => ({...state, isLoading: true})), // this is the start of loadting posts we want to show the spinner of loading
    on(PostsActions.loadPostsSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      posts: action.posts
    })),
    on(PostsActions.loadPostsFailure, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error
    }))
  )
