import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';
import { BnNgIdleService } from 'bn-ng-idle';
import { ToastrService } from 'ngx-toastr';
import { PasswordStrengthValidator } from 'src/app/pipes/password-strength-validators';
import { UserregistationService } from 'src/services/userregistation.service';
import { matchValidator } from './confirmed.validator';
import { UserSignupComponent } from 'src/pages/user-signup/user-signup.component';



@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.scss']
})
export class UserloginComponent implements OnInit {
  hide = true;
  pwHide = true

  enabled: boolean = false

  show!: boolean;
  show1: boolean = true;

  hideOtpInput!: boolean;
  hideOtpInput1: boolean = true;


  hideEmailInput!: boolean
  hideEmailInput1: boolean = true

  passwordsMatching = false;
  isConfirmPasswordDirty = false;
  confirmPasswordClass = 'form-control';

  submitted: any

  errData: any
  public userLoginForm = this.fb.group({
    email: ['', [Validators.required,Validators.pattern(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}/)]],
    password: ['', [Validators.required,]],
  })

  public forgotPswForm = this.fb.group({
    email: ['', [Validators.required, ]],
    otp: ['',],
    new_password: ['', [Validators.required, PasswordStrengthValidator,]],
    confirm_password: ['', [Validators.required, matchValidator('new_password')]],
  },

  )

  constructor(public fb: FormBuilder,
    public router: Router,
    public userregister: UserregistationService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserloginComponent>,
    public toastr: ToastrService,
    private userbnIdle: BnNgIdleService,
    public dialog: MatDialog
  ) {

  }

  signup() {
    this.dialogRef.close()
    const dialogRef = this.dialog.open(UserSignupComponent, {
      panelClass: 'usersignup-dialog',
      disableClose: true,
    });
    dialogRef.afterClosed()
  }


  ngOnInit(): void {
    if (localStorage.getItem('user-token')) {
      this.router.navigate(['/home'])
    }    
  }
  cloceDialog(){
    this.dialogRef.close()
  }

  usrlog() {
    if (this.userLoginForm.valid) {
      this.userregister.loginData(this.userLoginForm.value).subscribe((data: any) => {
        if (data.success == true) {
          this.toastr.success('Your Login Successfully!', 'Success!');
          localStorage.setItem('user-token', data.token);
          localStorage.setItem('userData', JSON.stringify(data.data))
          this.dialogRef.close(data)
        } else {
          this.errData = 'you are not user'
        }
      }, error => { 
        this.errData = error.error.data
      }
      )
    }

  }

  userOtp: any

  onOtpChange(data: any) {
    this.forgotPswForm.value.otp = data
    this.userOtp = data
  }


  forGetPsw() {
    this.show = true
    this.show1 = false
  }

  forgotErrData: any
  forGotPswSendOpt() {
    if (this.forgotPswForm.value.email) {
      this.enabled = true
      this.userregister.userForGotPsw(this.forgotPswForm.value).subscribe((data: any) => {
        if (data.success) {

          this.enabled = false
          this.hideOtpInput = true
          this.hideOtpInput1 = false
          this.toastr.success(data.data, 'Success')
        }
      }, error => {
        this.enabled = false
        this.forgotErrData = error.error.data
      }
      )
    }
  }

  errOtpCheck: any
  verifyOtp() {
    if (this.forgotPswForm.value.email && this.forgotPswForm.value.otp) {
      this.userregister.userVerifyOtp(this.forgotPswForm.value).subscribe((data: any) => {
        console.log(data)
        if (data.success) {
          this.hideEmailInput = true
          this.hideEmailInput1 = false
        }
      }, error => {
        console.log(error)
        this.errOtpCheck = error.error.data
      }

      )
    }
  }

  resetPsw() {
    if (this.forgotPswForm.valid) {
      const reqData = {
        confirm_password: this.forgotPswForm.value.confirm_password,
        email: this.forgotPswForm.value.email,
        new_password: this.forgotPswForm.value.new_password,
        otp: this.userOtp
      }
      this.enabled = true
      this.userregister.userResetPsw(reqData).subscribe((data: any) => {
        if (data.success) {
          this.enabled = false
          this.toastr.success('Your password changed Successfully!', 'Success!');

          this.dialogRef.close(data)
        }
      })
    } else {

    }

  }

  TermsOfUse(){
    this.router.navigate(["/terms-of-use"])
    this.dialogRef.close()
  }

}
