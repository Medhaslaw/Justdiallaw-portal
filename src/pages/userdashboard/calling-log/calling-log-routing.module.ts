import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallingLogComponent } from './calling-log.component';

const routes: Routes = [{ path: '', component: CallingLogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallingLogRoutingModule { }
