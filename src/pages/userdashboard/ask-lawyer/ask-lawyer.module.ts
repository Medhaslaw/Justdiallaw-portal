import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AskLawyerComponent } from './ask-lawyer.component';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: AskLawyerComponent }];

@NgModule({
  declarations: [
    AskLawyerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    ReactiveFormsModule

  ]
})
export class AskLawyerModule { }
