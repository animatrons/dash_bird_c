import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, filter, map, mergeMap, of, share, startWith, tap } from "rxjs";
import { TechnicalError } from "src/app/core/models/Error";
import { AppState } from 'src/app/store/index';
import { PostsService } from "../service/posts.service";
import * as PostsActions from "./actions";
import { fromPosts } from "./selectors";
import { TimeService } from "../../../core/utils/time.service";
import { AlertService } from "src/app/core/utils/alert.service";

@Injectable()
export class PostsEffects {
  MAX_AGE = 3600000; // Max age of state before loading new data. One hour in ms

  getPosts$ = createEffect(() => {
    return this.action$.pipe(
      ofType(PostsActions.getPosts),
      concatLatestFrom(() => [
        this.store.select(fromPosts.selectUpdatedAt),
        this.store.select(fromPosts.selectLoadStatus)
      ]),
      filter(([, updatedAt, status]) => status === "NOT_LOADED" || this.timeUtils.timeSince(updatedAt) > this.MAX_AGE),
      map(() => PostsActions.loadPosts())
    )
  });

  loadPosts$ = createEffect(() => {
    return this.action$.pipe(
      ofType(PostsActions.loadPosts),
      mergeMap(() => {
        let loadAll$ = this.postsService.loadAll().pipe(share());
        let autoCloseLoading$ = loadAll$.pipe(startWith(false), map(() => true), catchError(() => of(true)));

        this.alertService.loading('Getting you the posts', autoCloseLoading$, {title: 'Be patient'});
        return loadAll$
          .pipe(
            map((posts) => PostsActions.loadPostsSuccess({ posts })),
            catchError((error) =>
              of(PostsActions.loadPostsFailure({error: new TechnicalError(error, 0)}))
            )
          )
      })
    )
  });

  loadPoastsSuccess$ = createEffect(() => {
    return this.action$.pipe(
      ofType(PostsActions.loadPostsSuccess),
      tap((posts) => this.alertService.success(`${posts.posts.length} were loaded with success`, {title: 'Loading success'}))
    )},
    { dispatch: false }
  );

  loadPoastsFailed$ = createEffect(() => {
    return this.action$.pipe(
      ofType(PostsActions.loadPostsFailure),
      tap(() => this.alertService.danger('MAN SOMETHISNg REALY BAD HAPPEDNED HURRY UP YOU ARE IN DANGER'))
    )},
    { dispatch: false }
  );

  constructor(private action$: Actions, private postsService: PostsService,
    private store: Store<AppState>, private timeUtils: TimeService,
    private alertService: AlertService) {}
}
