import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PasswordStrengthValidator } from 'src/app/pipes/password-strength-validators';
import { UserregistationService } from 'src/services/userregistation.service';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss']
})
export class UserSignupComponent implements OnInit {
  hide = true;
  errData:any
  emailError:any
  mobileNoError:any
  show:boolean = true
  show1:boolean = false

   userSignUpForm!: FormGroup;

   submitted:any

   enabled:boolean = false
  
   showform:boolean = true

  constructor(public fb : FormBuilder, public userregister: UserregistationService,  public dialogRef: MatDialogRef<UserSignupComponent>,
    public router: Router, public snakbar: MatSnackBar,
    public toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.userSignUpForm = this.fb.group({
      first_name: ['', [Validators.required, ]],
      last_name: ['', [Validators.required,]],
      email:['', [Validators.required, Validators.pattern(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}/) ]],
      phone_no: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      password: ['', [Validators.required,PasswordStrengthValidator ]],
      otp:['',],
    }) 

  }

  regsave(){
   
    if(this.userSignUpForm.valid){
      this.enabled= true
      this.userregister.userreg(this.userSignUpForm.value).subscribe((res:any) => {
        if(res.success == true){
          console.log(res)
          this.enabled= false
          this.show = false
          this.show1 = true
        }else if(res.success == false){
          this.show = true
          this.show1 = false
          this.enabled= false
        }
      }, error => {
        this.enabled= false
        let resErroe:any = error.error
        if(resErroe.email && resErroe.phone_no ){
          this.errData =  'Email and Mobile Already Exists'
        } else if(resErroe.email){
          this.errData =  resErroe.email
        }
        else if(resErroe.phone_no){
          this.errData =  resErroe.phone_no
        } else if(resErroe.data){
          this.errData =  resErroe.data
        }
        })
     

     

    }else{
      this.show = true
      this.show1 = false
    }
    // if(this.userSignUpForm.valid){
    //   this.enabled= true
    //   this.userregister.userreg(this.userSignUpForm.value).subscribe(data => {
    //     if(data.success == true){
    //       this.toastr.success('Your Register Successfully!', 'Success!');
    //       this.enabled= false
    //        this.showform = false
    //     }
    //   },
    //   error => {
    //     this.enabled= false
    //     let resErroe:any = error.error
    //     if(resErroe.email && resErroe.phone_no ){
    //       this.errData =  'Email and Mobile Already Exists'
    //     } else if(resErroe.email){
    //       this.errData =  resErroe.email
    //     }
    //     else if(resErroe.phone_no){
    //       this.errData =  resErroe.phone_no
    //     }
    //     }
    //     )
    // }
  }

  keyPressAlphaNumeric(event:any) {

    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  knowMore(){
    this.router.navigate(['/about-us'])
  }

  closeDialog(){
    this.dialogRef.close()
  }
  userSingUp(){
    if(this.userSignUpForm.valid && this.userSignUpForm.value.otp ){
      this.userregister.otpVerification(this.userSignUpForm.value).subscribe((res:any) =>{
        if(res.success == true){
          this.toastr.success('Your Register Successfully!', 'Success!');
          this.dialogRef.close()
        }else{
          this.toastr.error();
        }
      },error => {
      if(error.error.data){
          this.errData =  error.error.data
        }
      })
    }
  }
  save(){

  }
  onOtpChange(data:any){
    this.userSignUpForm.value.otp = data
  }

}
