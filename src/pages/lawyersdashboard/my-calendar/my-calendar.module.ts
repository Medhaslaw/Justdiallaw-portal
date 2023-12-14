import { NgModule } from '@angular/core';
import { CommonModule ,DatePipe} from '@angular/common';

import { MyCalendarRoutingModule } from './my-calendar-routing.module';
import { MyCalendarComponent } from './my-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SlotsBlockingModelComponent } from './slots-blocking-model/slots-blocking-model.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    MyCalendarComponent,
    SlotsBlockingModelComponent
  ],
  imports: [
    CommonModule,
    MyCalendarRoutingModule,
    FullCalendarModule,
    MatDialogModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
     ReactiveFormsModule,
     MatNativeDateModule,
     MatInputModule
  ],
  providers:[DatePipe]
})
export class MyCalendarModule { }
