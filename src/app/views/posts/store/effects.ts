import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, filter, map, mergeMap, of } from "rxjs";
import { TechnicalError } from "src/app/core/models/Error";
import { AppStateInterface } from "src/app/types/app-state.interface";
import { PostsService } from "../service/posts.service";
import * as PostsActions from "./actions";
import { fromPosts } from "./selectors";

@Injectable()
export class PostsEffects {

  getPosts$ = createEffect(() => {
    return this.action$.pipe(
      ofType(PostsActions.getPosts),
      concatLatestFrom(() => this.store.select(fromPosts.loadStatusSelector)),
      filter(([, status]) => status === "NOT_LOADED"),
      map(() => PostsActions.loadPosts())
    )
  })

  loadPosts$ = createEffect(() => {
    return this.action$.pipe(
      ofType(PostsActions.loadPosts),
      mergeMap(() => {
        return this.postsService.loadAll()
          .pipe(
            map((posts) => PostsActions.loadPostsSuccess({ posts })),
            catchError((error) =>
              of(PostsActions.loadPostsFailure({error: new TechnicalError(error, 0)}))
            )
          )
      })
    )
  })

  constructor(private action$: Actions, private postsService: PostsService, private store: Store<AppStateInterface>) {}
}
