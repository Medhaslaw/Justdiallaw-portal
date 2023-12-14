import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from 'src/pages/home/home.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from '../pages/header/header.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FooterComponent } from '../pages/footer/footer.component';
import { LawyersListComponent } from '../pages/lawyers-list/lawyers-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ConfirmedComponent } from '../pages/confirmed/confirmed.component';
import { ClientdetailsComponent } from '../pages/clientdetails/clientdetails.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LawyerbriefComponent, clickToCall } from '../pages/lawyerbrief/lawyerbrief.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDrawerContent, MatSidenavModule } from '@angular/material/sidenav';
import { LawyersdashboardComponent } from 'src/pages/lawyersdashboard/lawyersdashboard.component';
import { LawyersDashboardHeaderComponent } from 'src/pages/lawyers-dashboard-header/lawyers-dashboard-header.component';
import { UserdashboardComponent, userApprovePopComponent, userImgPopComponent } from 'src/pages/userdashboard/userdashboard.component';
import { UserSignupComponent } from '../pages/user-signup/user-signup.component';
import { LawyersSignupComponent } from '../pages/lawyers-signup/lawyers-signup.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { OtpComponent } from '../pages/otp/otp.component';
import { ErrorpageComponent } from '../pages/errorpage/errorpage.component';
import { appconfig, environment } from 'src/providers/appconfig';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgOtpInputModule } from 'ng-otp-input';
import { HeadersInterceptor } from './interceptor/headers.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthGuard } from './auth/auth.guard';
import { RegistationprocessComponent } from '../pages/registationprocess/registationprocess.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipInput, MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { LawyerloginmodelComponent } from '../pages/header/lawyerloginmodel/lawyerloginmodel.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UserloginComponent } from '../pages/header/userlogin/userlogin.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { LawyerInfoComponent } from '../pages/components/lawyer-info/lawyer-info.component';
import { ToastrModule } from 'ngx-toastr';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { BlogComponent } from 'src/pages/blog/blog.component';
import { AboutUsComponent } from 'src/pages/about-us/about-us.component';
import { ContactUsComponent } from 'src/pages/contact-us/contact-us.component';
import { SpinnersAngularModule } from 'spinners-angular';
import { ViewCasesComponent } from 'src/pages/view-cases/view-cases.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeModule } from './theme/theme.module';
import { darkTheme } from './theme/dark-theme';
import { lightTheme } from './theme/light-theme';
// import {AccordionModule} from 'primeng/accordion'; 
// import {GMapModule} from 'primeng/gmap';
// import { AgmCoreModule } from '@agm/core';


// import { NgHttpCachingModule, NgHttpCachingConfig, NgHttpCachingStrategy } from 'ng-http-caching';

// const ngHttpCachingConfig: NgHttpCachingConfig = {
//   lifetime: 1000 * 60, // cache expire after 60 seconds,
//   allowedMethod: ['GET', 'HEAD'],
//   cacheStrategy: NgHttpCachingStrategy.ALLOW_ALL,
// };

import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { BlogsAboutComponent } from 'src/pages/blogs-about/blogs-about.component';
import { UserIdleModule } from 'angular-user-idle';
import { BnNgIdleService } from 'bn-ng-idle';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DatePipe } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { IntellectualPropertyAssignmentAgreementComponent, ThankPopUPComponent } from '../pages/intellectual-property-assignment-agreement/intellectual-property-assignment-agreement.component';
import { ForLawyersComponent } from '../pages/for-lawyers/for-lawyers.component';
import { CategoriesComponent } from '../pages/categories/categories.component';
import { CurrencyPipe } from './pipes/currency.pipe';

import { initializeApp } from "firebase/app";
import { StartupComponent } from '../pages/startup/startup.component';
initializeApp(environment.firebase);
// import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeFr from '@angular/common/locales/fr';
import localeIn from '@angular/common/locales/en-IN';
import { TermsOfUseComponent } from 'src/pages/terms-of-use/terms-of-use.component';
import { PrivacyPolicyComponent } from 'src/pages/privacy-policy/privacy-policy.component';
import { PrivacyDialogComponent } from 'src/pages/privacy-dialog/privacy-dialog.component';
import { SubHeaderComponent } from '../pages/sub-header/sub-header.component';
import { SubNavComponent } from '../pages/sub-nav/sub-nav.component';
import { UserheaderComponent } from '../pages/userdashboard/userheader/userheader.component';
import { AddBankDetailsComponent } from 'src/pages/lawyersdashboard/add-bank-details/add-bank-details.component';

registerLocaleData(localeIn);
registerLocaleData(localeEn, 'en');
registerLocaleData(localeFr, 'fr');


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LawyersListComponent,
    ConfirmedComponent,
    ClientdetailsComponent,
    LawyerbriefComponent,
    LawyersdashboardComponent,
    LawyersDashboardHeaderComponent,
    UserdashboardComponent,
    UserSignupComponent,
    LawyersSignupComponent,
    OtpComponent,
    ErrorpageComponent,
    RegistationprocessComponent,
    LawyerloginmodelComponent,
    UserloginComponent,
    SafeHtmlPipe,
    LawyerInfoComponent,
    BlogComponent,
    AboutUsComponent,
    ContactUsComponent,
    ViewCasesComponent,
    BlogsAboutComponent,
    IntellectualPropertyAssignmentAgreementComponent,
    ForLawyersComponent,
    CategoriesComponent,
    CurrencyPipe,
    clickToCall,
    StartupComponent,
    TermsOfUseComponent,
    PrivacyPolicyComponent,
    PrivacyDialogComponent,
    SubHeaderComponent,
    SubNavComponent,
    UserheaderComponent,
    ThankPopUPComponent,
    userApprovePopComponent,
    userImgPopComponent,
    AddBankDetailsComponent
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true,
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    SlickCarouselModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatExpansionModule,
    HttpClientModule,
    NgOtpInputModule,
    MatSnackBarModule,
    MatStepperModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatProgressBarModule,
    NgCircleProgressModule.forRoot({}),
    // AccordionModule,
    // GMapModule
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyBggBIaDjUAxVmzfQP-9-o8dJVuk1ucQR8'
    // })
    SpinnersAngularModule,
    NgbModule,
    // NgHttpCachingModule.forRoot(ngHttpCachingConfig),
    NgbPaginationModule,
    NgbAlertModule,
    ThemeModule.forRoot({
      themes: [lightTheme, darkTheme],
      active: 'light'
    }),

    UserIdleModule.forRoot({ idle: 10, timeout: 10, ping: 10 }),
    FullCalendarModule,
    NgMultiSelectDropDownModule,
    // NgxDocViewerModule

  ],
  providers: [appconfig,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true
    },
    AuthGuard,
    BnNgIdleService,
    DatePipe

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
