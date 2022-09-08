import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileModule } from './profile/profile.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProfileModule,
    DashboardModule,
    CoreModule
  ]
})
export class ViewModule { }
