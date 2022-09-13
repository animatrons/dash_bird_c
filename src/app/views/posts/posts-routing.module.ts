import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts.component';
import { PostComponent } from "./components/post/post.component";

const routes: Routes = [
  { path: '', component: PostsComponent },
  {
    path: 'new',
    component: PostComponent,
    data: {mode: 'new'}
  },
  {
    path: 'edit/:id',
    component: PostComponent,
    data: {mode: 'edit'}
  },
  {
    path: 'select/:id',
    component: PostComponent,
    data: {mode: 'select'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
