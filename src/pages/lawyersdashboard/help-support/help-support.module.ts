import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpSupportComponent } from './help-support.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';

const routes: Routes = [{ path: '', component: HelpSupportComponent }];

@NgModule({
  declarations: [
    HelpSupportComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatExpansionModule
  ]
})
export class HelpSupportModule { }
