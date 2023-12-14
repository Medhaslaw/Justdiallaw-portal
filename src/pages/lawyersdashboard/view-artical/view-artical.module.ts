import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewArticalRoutingModule } from './view-artical-routing.module';
import { ViewArticalComponent } from './view-artical.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgxEditorModule } from 'ngx-editor';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddBlogComponent } from '../add-blog/add-blog.component';
@NgModule({
  declarations: [
    ViewArticalComponent,
    AddBlogComponent
  ],
  imports: [
    CommonModule,
    ViewArticalRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgxEditorModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule,

  ]
})
export class ViewArticalModule { }
