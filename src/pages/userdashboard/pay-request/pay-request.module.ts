import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayRequestComponent } from './pay-request.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [{ path: '', component: PayRequestComponent }];

@NgModule({
  declarations: [
    PayRequestComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule
  ]
})
export class PayRequestModule { }
