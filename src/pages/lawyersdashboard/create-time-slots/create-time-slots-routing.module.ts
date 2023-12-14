import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTimeSlotsComponent } from './create-time-slots.component';

const routes: Routes = [{ path: '', component: CreateTimeSlotsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateTimeSlotsRoutingModule { }
