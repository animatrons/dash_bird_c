import { createSelector } from "@ngrx/store";
import { AppState } from 'src/app/store/index';

export const selectFeature = (state: AppState) => state.posts;

export const selectLoadStatus = createSelector(
  selectFeature,
  (state) => state.loadStatus
);

export const selectUpdatedAt = createSelector(
  selectFeature,
  (state) => state.updatedAt
);

export const selectAllPosts = createSelector(
  selectFeature,
  (state) => state.posts
);

export const selectError = createSelector(
  selectFeature,
  (state) => state.error
);

export const selectById = (id: string) => createSelector(
    selectAllPosts,
    (posts) => posts.find(p => p.id === id)
  );

export const fromPosts = {
  selectLoadStatus,
  selectUpdatedAt,
  selectAllPosts,
  selectError,
  selectById
}
