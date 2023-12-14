import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnquiriesComponent } from './enquiries.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

const routes: Routes = [{ path: '', component: EnquiriesComponent }];

@NgModule({
  declarations: [
    EnquiriesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatCardModule

  ]
})
export class EnquiriesModule { }
