import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileModule } from './profile/profile.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { PostsModule } from './posts/posts.module';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertModule } from './alert/alert.module';
import { AlertComponent } from './alert/alert.component';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';



@NgModule({
  declarations: [
  ],
  imports: [
    AlertModule,
    CommonModule,
    ProfileModule,
    DashboardModule,
    CoreModule,
    SharedModule,
    LoginModule
    // PostsModule
    // NgbModule
  ]
})
export class ViewModule { }
