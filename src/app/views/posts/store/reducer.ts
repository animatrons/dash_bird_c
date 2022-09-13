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
    on(PostsActions.getPosts, (state) => ({...state, isLoading: true})), // this is the start of getting posts we want to show the spinner of loading
    on(PostsActions.getPostsSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      posts: action.posts
    })),
    on(PostsActions.getPostsFailure, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error
    }))
  )
