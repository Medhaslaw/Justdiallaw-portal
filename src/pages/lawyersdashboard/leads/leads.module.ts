import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadsComponent } from './leads.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule} from '@angular/material/menu';

import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { MatIconModule } from '@angular/material/icon';
import { ViewCasesComponent } from 'src/pages/view-cases/view-cases.component';
const routes: Routes = [{ path: '', component: LeadsComponent }];
@NgModule({
  declarations: [
    LeadsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatIconModule,
    NgbPaginationModule,
     NgbAlertModule
 

  ]
})
export class LeadsModule { }
