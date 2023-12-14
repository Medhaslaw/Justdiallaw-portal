import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LawyeregService } from 'src/services/lawyereg.service';

@Component({
  selector: 'app-lawyers-signup',
  templateUrl: './lawyers-signup.component.html',
  styleUrls: ['./lawyers-signup.component.scss']
})
export class LawyersSignupComponent implements OnInit {
  panelOpenState = false;
  errData:any
  public lawyerSignUp = this.fb.group({
    first_name: ['', [Validators.required,]],
    last_name: ['', [Validators.required,]],
    email:['', [Validators.required, ]],
    phone_no: ['', [Validators.required,]],
   
  }) 


  constructor(public fb : FormBuilder,public lawyerservice: LawyeregService, public route: Router ) { }

  ngOnInit(): void {
  }

  advacateReg(){
    if(this.lawyerSignUp.valid){
      this.lawyerservice.lawyerRegData(this.lawyerSignUp.value).subscribe((data:any) => {
       
        if(data.success == true){
          alert('otp sent to your email successfully')
          this.route.navigate(['/lawyers_login']);
          
        }
      },error => {
        let resErroe:any = error.error
          if(resErroe.email && resErroe.phone_no ){
            this.errData =  'Email and Mobile Already Exists'
          } else if(resErroe.email){
            this.errData =  'Email Already Exists'
          }
          else if(resErroe.phone_no){
            this.errData =  'Mobile Already Exists'
          }
        }
      
      )
    }
  }

}
