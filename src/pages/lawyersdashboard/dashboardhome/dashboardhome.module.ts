import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardhomeComponent } from './dashboardhome.component';
import { RouterModule, Routes } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { InvoiceComponent } from '../invoice/invoice.component';

const routes: Routes = [
  { path: '', component: DashboardhomeComponent  },
  // { path: 'home',  component: DashboardhomeComponent },
  // { path: 'Invoice', component:InvoiceComponent},
  // { path: 'Cases', component: CasesComponent}
  
  
];

@NgModule({
  declarations: [
    DashboardhomeComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatTableModule,
    MatCardModule,
    RouterModule.forChild(routes)
    
  ]
})
export class DashboardhomeModule { 

  

}
