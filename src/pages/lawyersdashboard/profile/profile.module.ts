import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ProfileComponent } from './profile.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { EditeProfileComponent } from '../edite-profile/edite-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { BarCouncilInformationComponent } from '../bar-council-information/bar-council-information.component';
import { ProfileinformationComponent } from '../profileinformation/profileinformation.component';
import {MatTooltipModule} from '@angular/material/tooltip';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxEditorModule } from 'ngx-editor';
import { ToastrModule } from 'ngx-toastr';
import { LawyerFeesDetailesComponent } from './lawyer-fees-detailes/lawyer-fees-detailes.component';
import { AddBankDetailsComponent } from '../add-bank-details/add-bank-details.component';

const routes: Routes = [{ path: '', component: ProfileComponent },
{path: 'edit_profile', component: EditeProfileComponent},
{path: 'bar_council_information', component: BarCouncilInformationComponent},
{path: 'profile_information', component: ProfileinformationComponent},
{path:'lawyer_fees_detailes', component:LawyerFeesDetailesComponent},
{path:'lawyer_add_bank_details', component:AddBankDetailsComponent}
];

@NgModule({
  declarations: [
    ProfileComponent,
    EditeProfileComponent,
    BarCouncilInformationComponent,
    ProfileinformationComponent,
    LawyerFeesDetailesComponent
  ],
  imports: [
    CommonModule,
    ToastrModule.forRoot(
      {
        timeOut: 3000,
      preventDuplicates: true,
      }
    ),
    NgMultiSelectDropDownModule.forRoot(),
    NgxEditorModule,
    RouterModule.forChild(routes),
    MatCardModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      "showImage": true,}),
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatTooltipModule,
    FormsModule
    

  ],
  providers:[DatePipe]
})
export class ProfileModule { }
