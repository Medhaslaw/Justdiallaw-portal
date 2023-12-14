import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserTimelinesRoutingModule } from './user-timelines-routing.module';
import { AddCommentDialog, addFileDialog, AddLinkDialog, deleteBlogsComponent, PaymentLinktDialog, UserTimelinesComponent } from './user-timelines.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { FileViewComponent } from './file-view/file-view.component';
// import "file-viewer";
// import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
@NgModule({
  declarations: [
    UserTimelinesComponent,
    AddLinkDialog,
    AddCommentDialog,
    PaymentLinktDialog,
    addFileDialog,
    FileViewComponent,
    deleteBlogsComponent
  ],
  imports: [
    CommonModule,
    UserTimelinesRoutingModule,
    RouterModule, 
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
   
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
  providers:[
    
  ]
})
export class UserTimelinesModule { }
