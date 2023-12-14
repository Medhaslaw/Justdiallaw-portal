import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JustLawSubscriptionComponent } from './just-law-subscription.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';

const routes: Routes = [{ path: '', component: JustLawSubscriptionComponent }];

@NgModule({
  declarations: [
    JustLawSubscriptionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatExpansionModule,

  ]
})
export class JustLawSubscriptionModule { }
