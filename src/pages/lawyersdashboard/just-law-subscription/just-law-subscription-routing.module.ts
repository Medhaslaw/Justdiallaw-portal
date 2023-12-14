import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JustLawSubscriptionComponent } from './just-law-subscription.component';



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JustLawSubscriptionRoutingModule { }
