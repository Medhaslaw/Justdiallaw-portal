import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentLinkComponent } from './payment-link.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { PaymentLinkPopupComponent } from '../payment-link-popup/payment-link-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

const routes: Routes = [{ path: '', component: PaymentLinkComponent }];
@NgModule({
  declarations: [
    PaymentLinkComponent,
    PaymentLinkPopupComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class PaymentLinkModule { }
