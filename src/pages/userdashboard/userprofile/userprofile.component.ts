import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/services/category.service';
import { UserregistationService } from 'src/services/userregistation.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
  selected1 = '1';
  selected2 = '1';
  submitted: any
  stateList: any[] = [];
  cityList: any[] = [];

  inputShow:boolean = false

  profileForm!: FormGroup
  profileDetails: any;
  first_name: any;
  datePipe: any;
  userDetails: any;
  constructor(public fb: FormBuilder, 
    public userService: UserregistationService,
     public _categoryService: CategoryService,
     public router: Router, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      first_name: ['',[Validators.required]],
      last_name: ['',[Validators.required]],
      gender: [''],
      email: ['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      phone_no: ['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      whatsapp_no:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      phone_no_same_as_whatsapp_no:['',[Validators.required]],
      address: ['',[Validators.required]],
      state: ['',[Validators.required]],
      city_name: ['',[Validators.required]],
      zip_code: ['',[Validators.required]],
    })

    if (localStorage.getItem('user-token')) {
      let obj: any = localStorage.getItem("userData")
      this.profileDetails = JSON.parse(obj)[0]
      this.getProfile()
    }
    this.getStates()
  }
  getProfile() {
    this.userService.getProfileDetails().subscribe(res => {
      if (res.length > 0) {
        this.userDetails = res[0]
        this.profileForm = this.fb.group({
          first_name: [this.userDetails.first_name,[Validators.required]],
          last_name: [this.userDetails.last_name,[Validators.required]],
          gender: [this.userDetails.gender,],
          email: [this.userDetails.email,[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
          phone_no: [this.userDetails.phone_no,[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
          address: [this.userDetails.address,[Validators.required]],
          state: [this.userDetails.state,[Validators.required]],
          whatsapp_no:[this.userDetails.whatsapp_no,[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
          phone_no_same_as_whatsapp_no:[this.userDetails.phone_no_same_as_whatsapp_no,[Validators.required]],
          city_name: [this.userDetails.city_name,[Validators.required]],
          zip_code: [this.userDetails.zip_code,[Validators.required]],
        })
        this.radioValue1 = this.userDetails.phone_no_same_as_whatsapp_no
        this.radioValue2 = this.userDetails.gender
        this.getStates()
      }
    })
  }

  group2Value:any

  selectedRadio:any

  radioValue1:any
  radioValue2:any
  whatsAppNumber( ){
console.log(this.radioValue1)
   
if(this.radioValue1 === 'Yes'){
  this.profileForm = this.fb.group({
         first_name: [this.userDetails.first_name,[Validators.required]],
          last_name: [this.userDetails.last_name,[Validators.required]],
          gender: [this.radioValue2,],
          email: [this.userDetails.email,[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
          phone_no: [this.userDetails.phone_no,[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
          address: [this.userDetails.address,[Validators.required]],
          state: [this.userDetails.state,[Validators.required]],
          whatsapp_no:[this.userDetails.phone_no,[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
          phone_no_same_as_whatsapp_no:[this.radioValue1,[Validators.required]],
          city_name: [this.userDetails.city_name,[Validators.required]],
          zip_code: [this.userDetails.zip_code,[Validators.required]],
  })
  
} else if( this.radioValue1 === 'No'){

  this.profileForm = this.fb.group({
    first_name: [this.userDetails.first_name,[Validators.required]],
          last_name: [this.userDetails.last_name,[Validators.required]],
          gender: [this.radioValue2,],
          email: [this.userDetails.email,[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
          phone_no: [this.userDetails.phone_no,[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
          address: [this.userDetails.address,[Validators.required]],
          state: [this.userDetails.state,[Validators.required]],
          whatsapp_no:[this.userDetails.whatsapp_no,[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
          phone_no_same_as_whatsapp_no:[this.radioValue1,[Validators.required]],
          city_name: [this.userDetails.city_name,[Validators.required]],
          zip_code: [this.userDetails.zip_code,[Validators.required]],
  })
}

  }

 

  getCities(ev: any) {
    this.cityList = [];
    this._categoryService.getCities().subscribe((res: any) => {
      res.forEach((element: any) => {
        if (element.state_name == ev.value) {
          this.cityList.push(element);
        }
      });

    })
  }
  getStates() {
    this._categoryService.getStates().subscribe((res: any) => {
      this.stateList = res;
      if(this.userDetails){
        this.getCities({ value: this.userDetails.state })
      }
    })
  }
  // userUpdate
  save() {
    if (this.profileForm.valid && this.radioValue2) {
      console.log(this.profileForm.value.whatsapp_no)
      let reqObj = {
        city_name: this.profileForm.value.city_name,
        gender: this.radioValue2,
        state: this.profileForm.value.state,
        first_name: this.profileForm.value.first_name,
        last_name: this.profileForm.value.last_name,
        email: this.profileForm.value.email,
        phone_no: this.profileForm.value.phone_no,
        whatsapp_no:this.profileForm.value.whatsapp_no,
        address: this.profileForm.value.address,
        zip_code: this.profileForm.value.zip_code,
        phone_no_same_as_whatsapp_no: this.profileForm.value.phone_no_same_as_whatsapp_no,
      }

      this.userService.userUpdate(reqObj).subscribe((data: any) => {
        if (data.id ) {
          this.toastr.success('Profile Updated Successfully!', 'Success!');
          this.userService.saveUserProfileData('data')
          this.router.navigate(['/my-jdl/profiledashboard']);
        }
      })
      
    } else{
      this.toastr.error('Please fill All inputs', 'Error!')
    }
  }

}
