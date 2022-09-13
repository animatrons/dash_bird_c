import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileModule } from './profile/profile.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { PostsModule } from './posts/posts.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProfileModule,
    DashboardModule,
    CoreModule,
    SharedModule,
    // PostsModule
  ]
})
export class ViewModule { }
