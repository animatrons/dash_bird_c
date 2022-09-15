import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { NavigationService } from 'src/app/core/utils/navigation.service';
import { AppStateInterface } from 'src/app/types/app-state.interface';
import { fromPosts } from '../../store/selectors';
import { PostInterface } from '../../types/post.interface';
import { PostsActions } from "../../store/actions";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit, OnDestroy {
  selected = false;
  storeSub: Subscription = new Subscription();
  @Input() post!: PostInterface | undefined;
  loadStatus$!: Observable<"NOT_LOADED" | "LOADING" | "LOADED">;

  constructor(private activatedRoute: ActivatedRoute, private nav: NavigationService, private router: Router, private store: Store<AppStateInterface>) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.data['mode'] === 'select') {
      const id = this.activatedRoute.snapshot.params['id'];
      this.selected = true;
      this.loadStatus$ = this.store.pipe<"NOT_LOADED" | "LOADING" | "LOADED">(select(fromPosts.selectLoadStatus));
      this.store.dispatch(PostsActions.getPosts());
      this.store.select(fromPosts.selectById(id)).subscribe((post) => {
        this.post = post;
      })
    }
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe()
  }

  back() {
    this.nav.back();
  }

  navigate(commands: any[]) {
    this.router.navigate(commands, {relativeTo: this.activatedRoute});
  }

}
