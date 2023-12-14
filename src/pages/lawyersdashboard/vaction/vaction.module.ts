import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VactionRoutingModule } from './vaction-routing.module';
import { VactionComponent } from './vaction.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select'
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    VactionComponent
  ],
  imports: [
    CommonModule,
    VactionRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDatepickerModule
  ]
})
export class VactionModule { }
