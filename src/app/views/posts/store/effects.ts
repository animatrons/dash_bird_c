import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { TechnicalError } from "src/app/core/models/Error";
import { PostsService } from "../service/posts.service";
import * as PostsActions from "./actions";

@Injectable()
export class PostsEffects {

  public loadPosts$ = createEffect(() => {
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

  constructor(private action$: Actions, private postsService: PostsService) {}
}
