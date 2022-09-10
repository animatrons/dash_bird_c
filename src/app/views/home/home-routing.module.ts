import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'prefix'
  },
  {
    path: 'welcome',
    component: HomeComponent,
    children: [
      {
        path: 'signin',
        // component: SigninComponent,
        // Here we are lazy loading a standalone component
        loadComponent: () => import('../../shared/signin/signin.component').then(c => c.SigninComponent)
      }
    ]
  },
  // {
  //   path: 'welcome/signin',
  //   loadChildren: () => import('./home.routes').then(r => r.HomeRoutes)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
