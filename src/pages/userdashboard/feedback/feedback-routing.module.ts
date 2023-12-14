import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFeedbackComponent } from './add-feedback/add-feedback.component';
import { FeedbackComponent } from './feedback.component';

const routes: Routes = [{ path: '', component: FeedbackComponent },
 {path:'add-feedback', component: AddFeedbackComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }
