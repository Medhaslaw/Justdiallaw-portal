import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCasesComponent } from './user-cases.component';

const routes: Routes = [{ path: '', component: UserCasesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCasesRoutingModule { }
