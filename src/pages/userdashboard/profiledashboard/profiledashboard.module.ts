import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfiledashboardComponent } from './profiledashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
const routes: Routes = [{ path: '', component: ProfiledashboardComponent }];

@NgModule({
  declarations: [
    ProfiledashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatTableModule,
    MatTooltipModule,
    MatMenuModule

  ]
})
export class ProfiledashboardModule { }
