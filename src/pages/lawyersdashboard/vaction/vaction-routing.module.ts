import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VactionComponent } from './vaction.component';

const routes: Routes = [{ path: '', component: VactionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VactionRoutingModule { }
