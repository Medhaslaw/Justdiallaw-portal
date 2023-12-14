import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBlogComponent } from '../add-blog/add-blog.component';
import { ViewArticalComponent } from './view-artical.component';

const routes: Routes = [
  
  { path: '', component: ViewArticalComponent,},
  {path:'add-article', component:AddBlogComponent},
  {path: 'edit-article/:id', component: AddBlogComponent}



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewArticalRoutingModule { }
