import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { TechnicalError } from "src/app/core/models/Error";
import { PostsService } from "../service/posts.service";
import * as PostsActions from "./actions";

@Injectable()
export class PostsEffects {

  public getPosts$ = createEffect(() => {
    return this.action$.pipe(
      ofType(PostsActions.getPosts),
      mergeMap(() => {
        return this.postsService.getAll()
          .pipe(
            map((posts) => PostsActions.getPostsSuccess({ posts })),
            catchError((error) =>
              of(PostsActions.getPostsFailure({error: new TechnicalError(error, 0)}))
            )
          )
      })
    )
  })

  constructor(private action$: Actions, private postsService: PostsService) {}
}
