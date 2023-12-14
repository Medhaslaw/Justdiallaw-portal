import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/services/category.service';
import { LawyeregService } from 'src/services/lawyereg.service';
import { UserregistationService } from 'src/services/userregistation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edite-profile',
  templateUrl: './edite-profile.component.html',
  styleUrls: ['./edite-profile.component.scss']
})
export class EditeProfileComponent implements OnInit {

  userDetails: any;

  submitted:any

  stateList:any[]=[];
  cityList:any[]=[];
  profileForm!: FormGroup;

  constructor(public formBuilder: FormBuilder, public lawyerService: LawyeregService, public snackBar: MatSnackBar, private toastr: ToastrService,
    public router: Router, public datePipe: DatePipe, public userService: UserregistationService, public _categoryService: CategoryService) { }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      phone_no: ['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required]
    })
    if (localStorage.getItem('lawyer-token')) {
     
     this.getProfile()
    }
  }

  getProfile(){
    this.lawyerService.getProfileDetails().subscribe(res=>{
      if(res.length > 0){
        this.userDetails=res[0]
        this.getStates()
       
      }
    })
  }

  profileUpdate() {
    if (this.profileForm.valid) {
      let reqObj = {
        city_name: this.profileForm.value.city,
        dob: this.datePipe.transform(this.profileForm.value.dob, 'yyyy-MM-dd'),
        gender: this.profileForm.value.gender,
        state: this.profileForm.value.state,
        first_name: this.profileForm.value.first_name,
        last_name: this.profileForm.value.last_name,
        email: this.profileForm.value.email,
        phone_no:  this.profileForm.value.phone_no
      }
      this.lawyerService.updateProfile(reqObj).subscribe(res=>{
        if(res.id){
          this.toastr.success('Profile Updated Successfully!', 'Success!');
          this.userService.saveProfileData('data')
          this.router.navigate(['/lawyer-jdl/profile'])
        }
      })
    }
  }

  getStates(){
    this._categoryService.getStates().subscribe((res:any)=>{
      this.stateList = res;
      this.profileForm = this.formBuilder.group({
        first_name: [this.userDetails.first_name, Validators.required],
        last_name: [this.userDetails.last_name, Validators.required],
        email: [this.userDetails.email, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        phone_no: [this.userDetails.phone_no, [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        gender: [this.userDetails.gender, Validators.required],
        dob: [this.userDetails.dob, Validators.required],
        city: [this.userDetails.city_name, Validators.required],
        state: [this.userDetails.state, Validators.required]
        
      })
      this.getCities({value: this.userDetails.state})
    })
      }
    
      getCities(ev:any){
        this.cityList = [];
        this._categoryService.getCities().subscribe((res:any)=>{
          res.forEach((element:any) => {
            if(element.state_name == ev.value){
              this.cityList.push(element);
            }
          });
    
        })
      }

      cancelBtn(){
          this.router.navigate(['/lawyer-jdl/profile'])
      }
}
