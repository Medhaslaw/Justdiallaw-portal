import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyOrderComponent } from './my-order.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgxStarsModule } from 'ngx-stars';
import { ReviewmodalComponent } from './reviewmodal/reviewmodal.component';
import { MatPaginatorModule } from '@angular/material/paginator';


const routes: Routes = [{ path: '', component: MyOrderComponent }];

@NgModule({
  declarations: [
    MyOrderComponent,
    ReviewmodalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    NgxStarsModule,
    MatPaginatorModule
    
  ],
  entryComponents:[ReviewmodalComponent]
})
export class MyOrderModule { }
