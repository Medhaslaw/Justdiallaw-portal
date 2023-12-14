import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskComponent } from './task.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { AddTaskComponent } from '../add-task/add-task.component';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

const routes: Routes = [{ path: '', component: TaskComponent },
  {path:'add_task', component: AddTaskComponent}
];

@NgModule({
  declarations: [
    TaskComponent,
    AddTaskComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
    

  ]
})
export class TaskModule { }
