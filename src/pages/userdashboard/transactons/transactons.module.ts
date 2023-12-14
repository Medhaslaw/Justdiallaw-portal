import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactonsComponent } from './transactons.component';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [{ path: '', component: TransactonsComponent }];

@NgModule({
  declarations: [
    TransactonsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
  
  ]
})
export class TransactonsModule { }
