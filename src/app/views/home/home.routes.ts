import { Routes } from '@angular/router';

export const HomeRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/signin/signin.component').then(c => c.SigninComponent)
  }
]
