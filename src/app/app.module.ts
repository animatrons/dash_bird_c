import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HomeComponent } from './home/home.component';
import { NewsModule } from './news/news.module';
import { ProfileModule } from './profile/profile.module';
import { SharedModule } from './shared/shared.module';
import { SigninComponent } from './signin/signin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    ProfileModule,
    DashboardModule,
    NewsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
