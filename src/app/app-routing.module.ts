import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./views/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./views/signup/signup.module').then((m) => m.SignupModule),
  },
  {
    path: 'feed',
    loadChildren: () => import('./views/feed/feed.module').then((m) => m.FeedModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
