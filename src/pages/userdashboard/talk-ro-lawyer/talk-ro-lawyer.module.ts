import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TalkRoLawyerComponent } from './talk-ro-lawyer.component';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [{ path: '', component: TalkRoLawyerComponent }];

@NgModule({
  declarations: [
    TalkRoLawyerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTableModule
  ]
})
export class TalkRoLawyerModule { }
