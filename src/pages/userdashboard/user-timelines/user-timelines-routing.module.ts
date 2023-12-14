import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileViewComponent } from './file-view/file-view.component';
import { UserTimelinesComponent } from './user-timelines.component';

const routes: Routes = [{ path: '', component: UserTimelinesComponent },
  {path:'view-file/:id', component: FileViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserTimelinesRoutingModule { }
