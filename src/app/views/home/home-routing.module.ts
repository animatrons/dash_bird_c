import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeProfileComponent } from './components/home-profile/home-profile.component';
import { AuthGuard } from "../../core/guards/auth.guard";
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginPageComponent } from '../login/components/login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: WelcomeComponent
      },
      {
        path: 'login',
        component: LoginPageComponent
      },
      {
        path: 'about',
        // Here we are lazy loading a standalone component, in the 'signin' path
        loadComponent: () => import('../../shared/standalone/about/about.component').then(c => c.AboutComponent)
      },
      {
        path: 'profile',
        component: HomeProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'posts',
        loadChildren: () => import('../posts/posts.module').then(m => m.PostsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
