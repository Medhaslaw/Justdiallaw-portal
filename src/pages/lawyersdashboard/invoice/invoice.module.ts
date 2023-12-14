import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceComponent } from './invoice.component';
import {MatCardModule} from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';
import { AddInvoiceComponent } from '../add-invoice/add-invoice.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';



const routes: Routes = [
  { path: '',  component: InvoiceComponent },
  { path: 'add_invoice', component: AddInvoiceComponent}
  
];

@NgModule({
  declarations: [
    InvoiceComponent,
    AddInvoiceComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
    
    
    

  ]
})
export class InvoiceModule { }
