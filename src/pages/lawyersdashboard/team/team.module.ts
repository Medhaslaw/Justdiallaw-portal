import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamComponent } from './team.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { AddTeamComponent } from '../add-team/add-team.component';
import {MatRadioModule} from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';

const routes: Routes = [{ path: '', component: TeamComponent },
  {path: 'Add_team', component: AddTeamComponent}
];

@NgModule({
  declarations: [
    TeamComponent,
    AddTeamComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTabsModule

  ]
})
export class TeamModule { }

