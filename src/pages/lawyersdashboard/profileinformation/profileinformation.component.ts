import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Editor } from 'ngx-editor';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

import * as _moment from 'moment';
import { Moment } from 'moment';
import { LawyeregService } from 'src/services/lawyereg.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};


@Component({
  selector: 'app-profileinformation',
  templateUrl: './profileinformation.component.html',
  styleUrls: ['./profileinformation.component.scss'],
  providers: [

    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ProfileinformationComponent implements OnInit {
  dropdownList: any[] = [];
 
  submitted:any

  selectedItems: any[] = [];
  dropdownSettings: any = {};
  selected1 = '1';
  startDate = new Date(1990, 0, 1);
  editor!: Editor;
  html: any = '';
  langues:any[]=[]

  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  profileInfoForm!: FormGroup;

  userDetails: any;
  constructor(public formBuilder: FormBuilder, public lawyerService: LawyeregService,
    public toastr: ToastrService, public router: Router) { }

  ngOnInit(): void {
    this.editor = new Editor();
    let obj: any = localStorage.getItem('jlLawyerData')
    this.userDetails = JSON.parse(obj)[0]
    if (this.userDetails.languages) {
      let langList: any = this.userDetails.languages.split(',')
      for (let i = 0; i < langList.length; i++) {
        this.selectedItems.push({
          name: langList[i]
        })
      }
    }

    this.profileInfoForm = this.formBuilder.group({
      about: ['', Validators.required],
      designation: ['', Validators.required],
      practicing: [ moment(), Validators.required],
      // practicing: ['', Validators.required],
      address: ['', Validators.required],
      chamber_address: ['', Validators.required],
      twitter: [''],
      facebook: [''],
      language_known :['', Validators.required],
      number_of_cases_completed:['', Validators.required],
    })
    
    this.dropdownList = [
      { name: 'Hindi' },
      { name: 'Telugu' },
      { name: 'English' },
      { name: 'Tamil' },
      { name: 'Kannada' },
      { name: 'Bengali' },
      { name: 'Urdu' },
      { name: 'Marathi' },
      { name: 'Punjabi' },
      { name: 'Assamese' },
      { name: 'Bodo' },
      { name: 'Dogri' },
      { name: 'Gujarati' },
      { name: 'Kashmiri' },
      { name: 'Konkani' },
      { name: 'Maithili' },
      { name: 'Malayalam' },
      { name: 'Marathi' },
      { name: 'Meitei' },
      { name: 'Nepali' },
      { name: 'Odia' },
      { name: 'Sanskrit' },
      { name: 'Santali' },
      { name: 'Sindhi' },
     

    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'name',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.getProfileInfo()

  }

  profileInfo:any;

  getProfileInfo(){
    this.lawyerService.getProfileInfo().subscribe((res:any)=>{
      if(res){
        this.profileInfo = res;
        this.selectedItems = [];
        let langList: any = JSON.parse(this.profileInfo.language_known)
        if(langList.length > 0){
          for (let i = 0; i < langList.length; i++) {
            this.selectedItems.push({
              name: langList[i]
            })
          }
        }
       
        this.profileInfoForm = this.formBuilder.group({
          about: [this.profileInfo.few_lines_about_you, Validators.required],
          designation: [this.profileInfo.designation, Validators.required],
          // practicing: [moment(this.profileInfo.practicing_since), Validators.required],
          practicing: [this.profileInfo.practicing_since, Validators.required],
          address: [this.profileInfo.address, Validators.required],
          chamber_address: [this.profileInfo.your_chamber_address, Validators.required],
          twitter: [this.profileInfo.twitter],
          facebook: [this.profileInfo.facebook],
          language_known:[this.profileInfo.language_known, Validators.required],
          number_of_cases_completed:[this.profileInfo.number_of_cases_completed,Validators.required]
        })
      }
    })
  }

  cancelBtn(){

    if(this.profileInfo.number_of_cases_completed && this.profileInfo.practicing_since ){
      this.router.navigate(['/lawyer-jdl/profile'])
    } else{
      this.toastr.error('Please Fill The All Inputs','Error!')
    }

  }

  submit() {
    
    
    if (this.profileInfoForm.valid) {
      let langList:any[] =[]

      this.selectedItems.forEach(eve =>{
        langList.push(eve.name)
      })


      let reqObj = {
        few_lines_about_you: this.profileInfoForm.value.about,
        designation: this.profileInfoForm.value.designation,
        practicing_since: this.profileInfoForm.value.practicing,
        address: this.profileInfoForm.value.address,
        your_chamber_address: this.profileInfoForm.value.chamber_address,
        language_known: JSON.stringify(langList),
        twitter: this.profileInfoForm.value.twitter,
        facebook: this.profileInfoForm.value.facebook,
        number_of_cases_completed:this.profileInfoForm.value.number_of_cases_completed
      }

      if(this.profileInfo){
        this.lawyerService.profileInfoUpdate(reqObj).subscribe(res=>{
          if(res.id){
           

            this.toastr.success('Profile Information updated successfully!', 'Success!');
        
            this.router.navigate(['/lawyer-jdl/profile'])
          }
        })
      }else{
        this.lawyerService.profileInfoSave(reqObj).subscribe(res=>{
          if(res.id){
            this.toastr.success('Profile Information added successfully!', 'Success!');
           
            this.router.navigate(['/lawyer-jdl/profile'])
          }
        })
      }

    

    }
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.profileInfoForm.value.practicing!;
    ctrlValue.year(normalizedMonthAndYear.year());
    this.profileInfoForm.controls['practicing'].setValue(ctrlValue);
    datepicker.close();
  }

  onItemSelect(ev: any) {
    console.log(ev)
  }

  onSelectAll(ev: any) { 
    console.log(ev)
  }
 
}
