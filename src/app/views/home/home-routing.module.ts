import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

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
        path: 'signin',
        // Here we are lazy loading a standalone component, in the 'signin' path
        loadComponent: () => import('../../shared/standalone/signin/signin.component').then(c => c.SigninComponent)
      },
      {
        path: 'about',
        loadComponent: () => import('../../shared/standalone/about/about.component').then(c => c.AboutComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
