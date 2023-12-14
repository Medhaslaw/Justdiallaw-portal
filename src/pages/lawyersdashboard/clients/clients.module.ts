import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsComponent } from './clients.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { AddClientComponent } from '../add-client/add-client.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [
  { path: '', component: ClientsComponent },
  { path: 'add_client', component: AddClientComponent}
];

@NgModule({
  declarations: [
    ClientsComponent,
    AddClientComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatTableModule
   
  ]
})
export class ClientsModule { }
