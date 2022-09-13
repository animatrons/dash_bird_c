import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppStateInterface } from 'src/app/types/app-state.interface';
import { fromPosts } from '../../store/selectors';
import { PostInterface } from '../../types/post.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit, OnDestroy {
  selected = false;
  storeSub: Subscription = new Subscription();
  @Input() post!: PostInterface | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<AppStateInterface>) { }

  ngOnInit(): void {
    if (this.route.snapshot.data['mode'] === 'select') {
      const id = this.route.snapshot.params['id'];
      this.selected = true;
      this.store.select(fromPosts.selectById(id)).subscribe((post) => {
        this.post = post;
      })
    }
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe()
  }

  back() {
    this.router.navigate(['..']);
  }

}
