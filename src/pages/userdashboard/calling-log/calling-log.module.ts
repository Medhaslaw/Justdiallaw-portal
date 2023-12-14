import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallingLogRoutingModule } from './calling-log-routing.module';
import { CallingLogComponent } from './calling-log.component';


@NgModule({
  declarations: [
    CallingLogComponent
  ],
  imports: [
    CommonModule,
    CallingLogRoutingModule
  ]
})
export class CallingLogModule { }
