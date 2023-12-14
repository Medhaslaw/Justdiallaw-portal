import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChip } from '@angular/material/chips';
import { MatVerticalStepper } from '@angular/material/stepper';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/services/category.service';
import { LawyeregService } from 'src/services/lawyereg.service';

export interface CategoryData {
  category_name:string;
  created_by:any;
  created_on:string;
  id:number;
  modified_on:string;
  status:boolean;
}

declare var google:any;
@Component({
  selector: 'app-registationprocess',
  templateUrl: './registationprocess.component.html',
  styleUrls: ['./registationprocess.component.scss']
})
export class RegistationprocessComponent implements OnInit {

  dataSource = new MatTableDataSource<CategoryData>;

  progressPercent: any = 0;
  startDate = new Date(1990, 0, 1);

  experienceList: any[] = []

  public courts: any[] = []
  public langugaes = [
    { name: 'Assamese' },
    { name: 'Bengali' },
    { name: 'Bodo' },
    { name: 'Dogri' },
    { name: 'English' },
    { name: 'Gujarati' },
    { name: 'Hindi' },
    { name: 'Kashmiri' },
    { name: 'Kannada' },
    { name: 'Konkani' },
    { name: 'Maithili' },
    { name: 'Malayalam' },
    { name: 'Meitei' },
    { name: 'Marathi' },
    { name: 'Nepali' },
    { name: 'Odia' },
    { name: 'Punjabi' },
    { name: 'Sanskrit' },
    { name: 'Santali' },
    { name: 'Sindhi' },
    { name: 'Telugu' },
    { name: 'Tamil' },
    { name: 'Urdu' },
  ]

  allCategory: any[] = []

  selectedCategorys: any[] = [];
  selectedLanguages: any[] = [];
  selectedCourt: any[] = [];
  geocoder: any;
  lawyerSignUpForm!: FormGroup
  officeAddressForm!: FormGroup
  experienceForm!: FormGroup
  practiceAreaForm!: FormGroup

  submitted: any

  errData: any
  successMsg: boolean = false;
  lawyerId: any
  GoogleAutocomplete: any;
  stateList: any[] = [];
  cityList: any[] = [];
  constructor(public fb: FormBuilder, public lawyerservice: LawyeregService,
    public _categoryService: CategoryService,
    public toastr: ToastrService
  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.geocoder = new google.maps.Geocoder;
   }

  ngOnInit(): void {
    this.lawyerSignUpForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}/)]],
      phone_no: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    })

    this.practiceAreaForm = this.fb.group({
      primary_category: ['', [Validators.required]]
    })

    this.officeAddressForm = this.fb.group({
      state: ['', Validators.required],
      city_name: ['', Validators.required],
      office_address: ['', Validators.required],
    })

    this.experienceForm = this.fb.group({
      year_of_practice: ['', [Validators.required,]],
      barcouncil_id: ['', [Validators.required,]],
    })

    for (let i = 0; i < 40; i++) {
      this.experienceList.push(i + 1)
    }

    this.getAllCategory()
    this.getStates()
    this.getCourts()
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
  filterCourts:any[] =[]
  searchItem: any;
  getCourts() {
    this._categoryService.getCourts().subscribe((res: any) => {
      this.courts = res;
      this.filterCourts = res
     
    })
  }
  
  search() {
    if(this.searchItem.length > 3){
      this.courts = this.filterCourts.filter((x: any) => x.text.toLowerCase().includes(this.searchItem.toLowerCase()) )
    }else if(this.searchItem.length == 0){
      this.courts = this.filterCourts
    }
  }

  getStates() {
    this._categoryService.getStates().subscribe((res: any) => {
      this.stateList = res;
    })
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



  selectCategorys(data: any) {
    if (this.selectedCategorys.includes(data)) {
      let index: any = this.selectedCategorys.indexOf(data)
      this.selectedCategorys.splice(index, 1)
    } else {
      this.selectedCategorys.push(data)
    }

  }

  select(data: any) {
    if (this.selectedCourt.includes(data)) {
      let index: any = this.selectedCourt.indexOf(data)
      this.selectedCourt.splice(index, 1)
    } else {
      this.selectedCourt.push(data)
    }
  }
  selectCourt(data: any) {
    this.selectedCourt.push(data)
  }

  selectlanguage(data: any) {
    if (this.selectedLanguages.includes(data)) {
      let index: any = this.selectedLanguages.indexOf(data)
      this.selectedLanguages.splice(index, 1)
    } else {
      this.selectedLanguages.push(data)
    }

  }

  advacateReg(stepper: MatStepper) {

    if (this.lawyerSignUpForm.valid && this.lawyerId) {
      

        this.lawyerservice.updateLawyer(this.lawyerSignUpForm.value,this.lawyerId).subscribe((data: any) => {
          if (data.success) {
            this.lawyerId = data.data.id;
            this.progressPercent = 25;
            stepper.next()
          }
  
        },
          error => {
            let resErroe: any = error.error
            if (resErroe.email && resErroe.phone_no) {
              this.errData = 'Email and Mobile Already Exists'
            } else if (resErroe.email) {
              this.errData =  resErroe.email
            }
            else if (resErroe.phone_no) {
              this.errData = resErroe.phone_no
            } else {
  
            }
          })

    } else if(this.lawyerSignUpForm.valid){
      this.lawyerservice.lawyerRegData(this.lawyerSignUpForm.value).subscribe((data: any) => {
        if (data.success) {
          this.lawyerId = data.data.id;
          this.progressPercent = 25;
          stepper.next()
        }

      },
        error => {
          let resErroe: any = error.error
          if (resErroe.email && resErroe.phone_no) {
            this.errData = 'Email and Mobile Already Exists'
          } else if (resErroe.email) {
            this.errData = resErroe.email
          }
          else if (resErroe.phone_no) {
            this.errData = resErroe.phone_no
          } else {

          }
        })
    }
  }

  practiArea(stepper: MatStepper) {
    if (this.lawyerId) {
      let reqDat = {
        primary_category: this.practiceAreaForm.value.primary_category,
        addon_category: this.selectedCategorys
      }
      if (this.practiceAreaForm.valid && this.selectedCategorys.length > 0) {
        this.lawyerservice.updateLawyer(reqDat, this.lawyerId).subscribe((data: any) => {
          if (data.success) {
            this.progressPercent = 50;
            stepper.next()
          }
        }, error => {
          let resErroe: any = error.error
          if (resErroe) {

          }
        }
        )
      } else if (this.selectedCategorys.length === 0) {
        this.toastr.error('Please Select the  Categorys!', 'Error!');
      }

    }
  }
  autocompleteItems:any[]=[]
  onAutocompleteSelected(ev:any){
    // console.log(ev)
    this.autocompleteItems = []
    this.GoogleAutocomplete.getPlacePredictions({ input: ev.target.value },
      (predictions: any, status: any) => {
          predictions.forEach((prediction: any) => {
            this.autocompleteItems.push(prediction);
          });
      });
   
  }

  latitude: any;
  longitude: any;

  state:any
  city:any
  selectArea(obj: any) {
  

    this.city = obj.description.split(", ")[0]
    this.state = obj.description.split(",")[1]

    this.officeAddressForm = this.fb.group({
      state: [ this.state, Validators.required],
      city_name: [ this.city, Validators.required],
      office_address: [obj.description, Validators.required],
    })

    console.log( this.city, '',this.state )

    this.geocoder.geocode({ 'placeId': obj.place_id }, (results: any, status: any) => {
      if (status === 'OK' && results[0]) {
        this.latitude = results[0].geometry.location.lat();
        this.longitude = results[0].geometry.location.lng();
      }
    })
  }


  addOffice(stepper: MatStepper) {
    if (this.lawyerId) {
      let reqDat = {
        city_name: this.officeAddressForm.value.city_name,
        office_address: this.officeAddressForm.value.office_address,
        court: JSON.stringify(this.selectedCourt),
        state: this.officeAddressForm.value.state,
        longitude:this.longitude,
        lattitude:this.latitude
      }
      if (this.officeAddressForm.valid && this.selectedCourt.length > 0) {
        this.lawyerservice.updateLawyer(reqDat, this.lawyerId).subscribe((data: any) => {
          if (data.success) {
            this.progressPercent = 75;
            stepper.next()
          }
        })
      } else if (this.selectedCourt.length === 0) {
        this.toastr.error('Please Select the  Courts!', 'Error!');
      }
    }
  }

  addExperience(stepper: MatStepper) {
    if (this.lawyerId) {
      let reqDat = {
        year_of_practice: this.experienceForm.value.year_of_practice,
        barcouncil_id: this.experienceForm.value.barcouncil_id,
        languages: JSON.stringify(this.selectedLanguages)
      }

      if (this.experienceForm.valid && this.selectedLanguages.length > 0) {
        this.lawyerservice.updateLawyer(reqDat, this.lawyerId).subscribe((data: any) => {
          if (data.success) {
            this.progressPercent = 100;
            stepper.next()
            this.successMsg = true;
          }
        })
      } else if (this.selectedLanguages.length === 0) {
        this.toastr.error('Please Select the  Languages!', 'Error!');
      }
    }
  }
  getAllCategory() {
    this._categoryService.listCategory().subscribe(data => {
      if (data.length > 0) {
        this.allCategory = data.filter((x: any) => x.status)
      }
    })
  }

}

