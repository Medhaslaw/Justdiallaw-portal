import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { AddCommentDialog, addFileDialog, AddLinkDialog, ClosedCasesComponent, deleteBlogsComponent, PaymentLinktDialog, TimelineComponent } from './timeline.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HeadersInterceptor } from 'src/app/interceptor/headers.interceptor';
import { MatTableModule } from '@angular/material/table';
import { FileViewComponent } from './file-view/file-view.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';

const routes: Routes = [{ path: '', component: TimelineComponent },
{path:'view-file/:id', component: FileViewComponent}
];

@NgModule({
  declarations: [
    TimelineComponent,
    AddLinkDialog,
    AddCommentDialog,
    PaymentLinktDialog,
    addFileDialog,
    FileViewComponent,
    deleteBlogsComponent,
    ClosedCasesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatCardModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule

  ],
  entryComponents:[AddLinkDialog,
    AddCommentDialog],
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: HeadersInterceptor,
        multi: true,
      },
    ],
})
export class TimelineModule { }
