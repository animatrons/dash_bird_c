import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/types/app-state.interface";


export const selectFeature = (state: AppStateInterface) => state.posts;

export const loadStatusSelector = createSelector(
  selectFeature,
  (state) => state.loadStatus
)

export const postsSelector = createSelector(
  selectFeature,
  (state) => state.posts
);

export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
);

export const fromPosts = {
  loadStatusSelector,
  postsSelector,
  errorSelector
}
