import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JudementComponent } from './judement.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { AddNewtopicComponent} from '../add-newtopic/add-newtopic.component'
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

const routes: Routes = [{ path: '', component: JudementComponent }];

@NgModule({
  declarations: [
    JudementComponent,
    AddNewtopicComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  entryComponents:[AddNewtopicComponent]
})
export class JudementModule { }
