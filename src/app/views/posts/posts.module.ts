import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { PostsService } from './service/posts.service';
import { StoreModule } from '@ngrx/store';
import { reducers } from "./store/reducer";
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from './store/effects';

@NgModule({
  declarations: [
    PostsComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    StoreModule.forFeature('posts', reducers),
    EffectsModule.forFeature([PostsEffects])
  ],
  providers: [
    PostsService
  ]
})
export class PostsModule { }
