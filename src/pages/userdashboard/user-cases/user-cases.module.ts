import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCasesRoutingModule } from './user-cases-routing.module';
import { UserCasesComponent } from './user-cases.component';
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
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    UserCasesComponent
  ],
  imports: [
    CommonModule,
    UserCasesRoutingModule,
    RouterModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule,
    NgxStarsModule,
    MatTooltipModule,
    MatCardModule,
    MatTabsModule
  ]
})
export class UserCasesModule { }
