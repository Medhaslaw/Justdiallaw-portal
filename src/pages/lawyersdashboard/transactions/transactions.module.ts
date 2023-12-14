import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsComponent } from './transactions.component';
import { RouterModule, Routes } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { TransactionWithdrawComponent } from '../transaction-withdraw/transaction-withdraw.component';

const routes: Routes = [{ path: '', component: TransactionsComponent }];

@NgModule({
  declarations: [
    TransactionsComponent,
    TransactionWithdrawComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatInputModule,    
    MatTableModule,
    MatDialogModule,



  ]
})
export class TransactionsModule { }
