import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './reducers/auth.reducer';
import * as fromPosts from "../views/posts/store/reducer";

export interface AppState {
  [fromPosts.postsFeatureKey]: fromPosts.State;
  [fromAuth.authFeatureKey]: fromAuth.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromPosts.postsFeatureKey]: fromPosts.reducers,
  [fromAuth.authFeatureKey]: fromAuth.reducer,
}
