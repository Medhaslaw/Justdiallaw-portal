import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from 'src/pages/about-us/about-us.component';
import { BlogComponent } from 'src/pages/blog/blog.component';
import { BlogsAboutComponent } from 'src/pages/blogs-about/blogs-about.component';
import { CategoriesComponent } from 'src/pages/categories/categories.component';
import { ClientdetailsComponent } from 'src/pages/clientdetails/clientdetails.component';
import { ConfirmedComponent } from 'src/pages/confirmed/confirmed.component';
import { ContactUsComponent } from 'src/pages/contact-us/contact-us.component';
import { ErrorpageComponent } from 'src/pages/errorpage/errorpage.component';
import { ForLawyersComponent } from 'src/pages/for-lawyers/for-lawyers.component';
import { HomeComponent } from 'src/pages/home/home.component';
import { IntellectualPropertyAssignmentAgreementComponent } from 'src/pages/intellectual-property-assignment-agreement/intellectual-property-assignment-agreement.component';
import { LawyerbriefComponent } from 'src/pages/lawyerbrief/lawyerbrief.component';
import { LawyersDashboardHeaderComponent } from 'src/pages/lawyers-dashboard-header/lawyers-dashboard-header.component';
import { LawyersListComponent } from 'src/pages/lawyers-list/lawyers-list.component';
import { LawyersSignupComponent } from 'src/pages/lawyers-signup/lawyers-signup.component';
import { LawyersdashboardComponent } from 'src/pages/lawyersdashboard/lawyersdashboard.component';
import { OtpComponent } from 'src/pages/otp/otp.component';
import { RegistationprocessComponent } from 'src/pages/registationprocess/registationprocess.component';
import { UserdashboardComponent } from 'src/pages/userdashboard/userdashboard.component';
import { UserSignupComponent } from '../pages/user-signup/user-signup.component';
import { AuthGuard } from './auth/auth.guard';
import { StartupComponent } from 'src/pages/startup/startup.component';
import { TermsOfUseComponent } from 'src/pages/terms-of-use/terms-of-use.component';
import { PrivacyPolicyComponent } from 'src/pages/privacy-policy/privacy-policy.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog-details/:title/:id/:role', component: BlogsAboutComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'lawyers-list', component: LawyersListComponent },
  { path: 'appointment_confirmed/:id', component: ConfirmedComponent },
  { path: 'book_appointment', component: ClientdetailsComponent },
  { path: 'lawyer_details/:id', component: LawyerbriefComponent },
  { path: 'user_signup', component: UserSignupComponent },
  { path: 'lawyer_header', component: LawyersDashboardHeaderComponent, },
  { path: 'registationprocess', component: RegistationprocessComponent },
  { path: 'documents/:documentName/:subDocumentName', component: IntellectualPropertyAssignmentAgreementComponent },
  { path: 'startup/:documentName/:subDocumentName', component: StartupComponent },

  // { path: '**', component: ErrorpageComponent },
  { path: 'lawyers_signup', component: LawyersSignupComponent },
  { path: 'lawyers_otp', component: OtpComponent },
  { path: 'for-lawyers', component: ForLawyersComponent },
  {path:'terms-of-use', component:TermsOfUseComponent},
  {path:'privacy-policy',component:PrivacyPolicyComponent},
  {
    path: 'lawyer-jdl', component: LawyersdashboardComponent,
    children: [
      { path: '', redirectTo: "home", pathMatch: 'full' },
      { path: 'home', loadChildren: () => import('../pages/lawyersdashboard/dashboardhome/dashboardhome.module').then(m => m.DashboardhomeModule), },
      { path: 'invoice', loadChildren: () => import('../pages/lawyersdashboard/invoice/invoice.module').then(m => m.InvoiceModule) },
      { path: 'cases', loadChildren: () => import('../pages/lawyersdashboard/cases/cases.module').then(m => m.CasesModule) },
      { path: 'clients', loadChildren: () => import('../pages/lawyersdashboard/clients/clients.module').then(m => m.ClientsModule) },
      { path: 'judgement', loadChildren: () => import('../pages/lawyersdashboard/judement/judement.module').then(m => m.JudementModule) },
      { path: 'leads', loadChildren: () => import('../pages/lawyersdashboard/leads/leads.module').then(m => m.LeadsModule) },
      { path: 'team', loadChildren: () => import('../pages/lawyersdashboard/team/team.module').then(m => m.TeamModule) },
      { path: 'task', loadChildren: () => import('../pages/lawyersdashboard/task/task.module').then(m => m.TaskModule) },
      { path: 'transactions', loadChildren: () => import('../pages/lawyersdashboard/transactions/transactions.module').then(m => m.TransactionsModule) },
      { path: 'paymentLink', loadChildren: () => import('../pages/lawyersdashboard/payment-link/payment-link.module').then(m => m.PaymentLinkModule) },
      { path: 'help_support', loadChildren: () => import('../pages/lawyersdashboard/help-support/help-support.module').then(m => m.HelpSupportModule) },
      { path: 'enquiries', loadChildren: () => import('../pages/lawyersdashboard/enquiries/enquiries.module').then(m => m.EnquiriesModule) },
      { path: 'profile', loadChildren: () => import('../pages/lawyersdashboard/profile/profile.module').then(m => m.ProfileModule) },
      { path: 'justLaw_subscription', loadChildren: () => import('../pages/lawyersdashboard/just-law-subscription/just-law-subscription.module').then(m => m.JustLawSubscriptionModule) },
      { path: 'my-calendar', loadChildren: () => import('../pages/lawyersdashboard/my-calendar/my-calendar.module').then(m => m.MyCalendarModule) },
      { path: 'create-time-slots', loadChildren: () => import('../pages/lawyersdashboard/create-time-slots/create-time-slots.module').then(m => m.CreateTimeSlotsModule) },
      { path: 'vacation', loadChildren: () => import('../pages/lawyersdashboard/vaction/vaction.module').then(m => m.VactionModule) },
      { path: 'timeline/:id', loadChildren: () => import('../pages/lawyersdashboard/timeline/timeline.module').then(m => m.TimelineModule) },
      { path: 'view-artical', loadChildren: () => import('../pages/lawyersdashboard/view-artical/view-artical.module').then(m => m.ViewArticalModule) },
    ], canActivate: [AuthGuard]
  },
  {
    path: 'my-jdl', component: UserdashboardComponent,
    children: [
      { path: '', redirectTo: 'profiledashboard', pathMatch: 'full' },
      { path: 'profiledashboard', loadChildren: () => import('../pages/userdashboard/profiledashboard/profiledashboard.module').then(m => m.ProfiledashboardModule), },
      { path: 'userprofile', loadChildren: () => import('../pages/userdashboard/userprofile/userprofile.module').then(m => m.UserprofileModule) },
      { path: 'transactions', loadChildren: () => import('../pages/userdashboard/transactons/transactons.module').then(m => m.TransactonsModule) },
      { path: 'my-appointments', loadChildren: () => import('../pages/userdashboard/my-order/my-order.module').then(m => m.MyOrderModule) },
      { path: 'calling-log', loadChildren: () => import('../pages/userdashboard/calling-log/calling-log.module').then(m => m.CallingLogModule) },
      { path: 'ask-lawyer', loadChildren: () => import('../pages/userdashboard/ask-lawyer/ask-lawyer.module').then(m => m.AskLawyerModule) },
      { path: 'payment-request', loadChildren: () => import('../pages/userdashboard/pay-request/pay-request.module').then(m => m.PayRequestModule) },
      { path: 'user-timelines/:id', loadChildren: () => import('../pages/userdashboard/user-timelines/user-timelines.module').then(m => m.UserTimelinesModule) },
      { path: 'feedback', loadChildren: () => import('../pages/userdashboard/feedback/feedback.module').then(m => m.FeedbackModule) },
      { path: 'my-cases', loadChildren: () => import('../pages/userdashboard/user-cases/user-cases.module').then(m => m.UserCasesModule) },
    ], canActivate: [AuthGuard]
  },
 

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {  scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
