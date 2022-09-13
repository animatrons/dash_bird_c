import { createAction, props } from "@ngrx/store";
import { TechnicalError } from "src/app/core/models/Error";
import { PostInterface } from "../types/post.interface";

export const loadPosts = createAction('[Posts] Load Posts');
export const loadPostsSuccess = createAction(
    '[Posts] Load Posts Success',
    props<{posts: PostInterface[]}>()
  );
export const loadPostsFailure = createAction(
    '[Posts] Load Posts Failure',
    props<{error: TechnicalError}>()
  );
