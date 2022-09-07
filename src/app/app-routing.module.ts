import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { SigninComponent } from './views/signin/signin.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-in', component: SigninComponent, },
  { path: 'profile', loadChildren: () => import('./views/profile/profile.module').then(module => module.ProfileModule) },
  { path: 'dashboard', loadChildren: () => import('./views/dashboard/dashboard.module').then(module => module.DashboardModule) },
  { path: 'sign-up', loadChildren: () => import('./views/signup/signup.module').then(m => m.SignupModule) },
  { path: 'feed', loadChildren: () => import('./views/feed/feed.module').then(m => m.FeedModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
