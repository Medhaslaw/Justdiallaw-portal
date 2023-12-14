import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  panelOpenState = false;

  otp!: string; showOtpComponent = true; 
@ViewChild("ngOtpInput", { static: false }) ngOtpInput: any; config = { allowNumbersOnly: true, length: 4, isPasswordInput: false, disableAutoFocus: false, placeholder: "*", inputStyles: { width: "50px", height: "50px", }, }; 

public otpVerifacationForm = this.fb.group({
  otp:['', [Validators.required,]],

})

  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
  } 

  onOtpChange(data:any){

  }


  save(){
    

  }

}
