import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'prefix'
  },
  {
    path: 'welcome',
    component: HomeComponent
  },
  {
    path: 'welcome/signin',
    component: SigninComponent
  }
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
