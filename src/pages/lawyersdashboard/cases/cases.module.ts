import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { CasesComponent, Reschedule } from './cases.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { AddCaseComponent } from '../add-case/add-case.component';
import { AddDistricCourtCaseComponent } from '../add-distric-court-case/add-distric-court-case.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule} from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';

const routes: Routes = [
  { path: '', component: CasesComponent  },
  { path: 'add_case', component: AddCaseComponent},
  { path: 'add_district_court_case', component:AddDistricCourtCaseComponent}
  
  
];

@NgModule({
  declarations: [
    CasesComponent,
    AddCaseComponent,
    AddDistricCourtCaseComponent,
    Reschedule
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule

  ],
  providers: [
    DatePipe
  ]
})
export class CasesModule { }
