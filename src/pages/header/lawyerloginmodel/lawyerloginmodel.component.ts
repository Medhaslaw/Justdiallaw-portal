import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { ToastrService } from 'ngx-toastr';
import { LawyeregService } from 'src/services/lawyereg.service';
import { UserregistationService } from 'src/services/userregistation.service';


@Component({
  selector: 'app-lawyerloginmodel',
  templateUrl: './lawyerloginmodel.component.html',
  styleUrls: ['./lawyerloginmodel.component.scss']
})
export class LawyerloginmodelComponent implements OnInit {
  panelOpenState = false;
  show!: boolean;
  show1: boolean = true;
  submitted:any
  errData:any
  errOtpCheckData:any

  enabled:boolean= false

  public lawyerLoginForm = this.fb.group({
    email:['', [Validators.required,Validators.pattern(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}/)]],
    otp:[''],
  }) 
  otp!: string; showOtpComponent = true; 
  @ViewChild("ngOtpInput", { static: false }) ngOtpInput: any; config = { allowNumbersOnly: true, length: 4, isPasswordInput: false, disableAutoFocus: false, placeholder: "*", inputStyles: { width: "50px", height: "50px", }, }; 

  constructor(public diagolref: MatDialogRef<LawyerloginmodelComponent>, public fb: FormBuilder,public route: Router,
    public lawyersService: LawyeregService, public snackBar: MatSnackBar, public userService: UserregistationService, 
    public toster: ToastrService,
    private lawyerbnIdle: BnNgIdleService
    ) { }

  ngOnInit(): void {
    if(localStorage.getItem('lawyer-token')){
      this.route.navigate(['/home'])
       }
  }

  signup(){
    this.diagolref.close('signup')
  }


  cloceDialog(){
    this.diagolref.close()
  }

  TermsOfUse(){
    this.route.navigate(['/terms-of-use'])
    this.diagolref.close()
  }

  save(){
    if(this.lawyerLoginForm.valid){
      this.enabled=true
      this.lawyersService.sendOtp(this.lawyerLoginForm.value).subscribe((data:any) => {
        if(data.success == true){
          if(data.success == true){
            this.enabled=false
            this.toster.success('Otp Sent Successfully!', 'Success!');
          }
          this.show = true
          this.show1 = false
          
        }else{
          this.errData = 'Enter Valid Credentials'
          this.enabled=false
        }
      },error => {
        this.enabled=false
        this.errData = error.error.data
        }
      
      )
    } 
  }
  onOtpChange(data:any){
    this.lawyerLoginForm.value.otp = data
  }
  
  lawyerLogin(){
    if(this.lawyerLoginForm.valid && this.lawyerLoginForm.value.otp){
      this.lawyersService.otpCheck(this.lawyerLoginForm.value).subscribe((data:any) => {
       

        if(data.success == true){
          this.toster.success('Your Login Success!', 'Success!')
          localStorage.setItem('lawyer-token', data.token );
          localStorage.setItem('jlLawyerData',JSON.stringify(data.user_data))
  
          this.userService.saveProfileData('data')
          this.diagolref.close(data)
        }
        this.route.navigate(['/lawyer-jdl'])
      },error => {
        let resErroe:any = error.error.data
        if(resErroe){
          this.errOtpCheckData = resErroe
        }
        }
      )
    } else{
      this.toster.error('Please Enter Otp')
    }
  }
}
