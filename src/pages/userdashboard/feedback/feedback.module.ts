import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './feedback.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgxStarsModule } from 'ngx-stars';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddFeedbackComponent } from './add-feedback/add-feedback.component';

@NgModule({
  declarations: [
    FeedbackComponent,
    AddFeedbackComponent
  ],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule
  ]
})
export class FeedbackModule { }
