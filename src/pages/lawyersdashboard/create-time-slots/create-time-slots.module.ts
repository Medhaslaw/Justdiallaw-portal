import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateTimeSlotsRoutingModule } from './create-time-slots-routing.module';
import { CreateTimeSlotsComponent } from './create-time-slots.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select'
@NgModule({
  declarations: [
    CreateTimeSlotsComponent
  ],
  imports: [
    CommonModule,
    CreateTimeSlotsRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule
  ]
})
export class CreateTimeSlotsModule { }
