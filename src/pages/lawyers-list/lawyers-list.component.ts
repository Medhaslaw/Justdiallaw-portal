import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, filter, pairwise } from 'rxjs';
import { appconfig } from 'src/providers/appconfig';
import { CategoryService } from 'src/services/category.service';
import { LawyeregService } from 'src/services/lawyereg.service';
import { LawyerslistService } from 'src/services/lawyerslist.service';
import { PortalService } from 'src/services/portal.service';
import { UserloginComponent } from '../header/userlogin/userlogin.component';
import { UserregistationService } from 'src/services/userregistation.service';

declare var $: any;
declare var google:any;

@Component({
  selector: 'app-lawyers-list',
  templateUrl: './lawyers-list.component.html',
  styleUrls: ['./lawyers-list.component.scss']
})
export class LawyersListComponent implements OnInit {
  changes = new Subject<void>();
  selected = 'option1';
  selected2 = 'option7';
  selected3 = 'Price';
  selectedopion = '1';
  categoryId: any
  locationVal: any
  lawyersListData: any
  lawyersArray: any[] = []
  navbarfixed!: boolean;
  imgUrl: any
  allCategory: any
  user_Profile: any
  categoryName: any
  categoryLength!: number;
  courts: any[] = []
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
  cityList: any[] = [];
  selectedCat: any;
  dropdownSettings: any = {};
  dropdownSettings1: any = {};
  dropdownSettings2: any = {};
  dropdownSettings3: any = {};
  dropdownSettings4: any = {};
  dropdownSettings5: any = {};

  experienceList: any[] = [
    { name: '< 5 Years', value: '4' },
    { name: '5-10 Years', value: '5' },
    { name: '10-15 Years', value: '10' },
    { name: '15 Years', value: '15' }
  ]

  genderList: any[] = [
    { name: 'Male' },
    { name: 'Female' },
    { name: 'Others' },

  ]
  geocoder:any;
  constructor(public router: Router,
    public lawyerService: LawyeregService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public _appConfig: appconfig,
    public lawyerList: LawyerslistService,
    public portalService: PortalService,
    public _categoryService: CategoryService,
    public userService: UserregistationService,
    @Inject(ActivatedRoute)
    public activatedRoute: ActivatedRoute
  ) {
    this.geocoder = new google.maps.Geocoder;

  //   this.router.events.pipe(pairwise()).subscribe((event:any) => {
  //     console.log(event[0].snapshot._routerState.url        ); // NavigationEnd will have last and current visit url
  // });

  } 

  latitude:any;
  longitude:any;

  categoryList: any[] = []
  categoryAllList:any[]=[];

  selectedItems: any[] = [];
  selectedItems1: any[] = [];
  selectedItems2: any[] = [];
  selectedItems3: any[] = [];
  selectedItems4: any[] = [];
  selectedItems5: any[] = [];
  language: any;

  previousUrl!: string ;
  currentUrl!: string;

  ngAfterViewInit(){
    if (this.categoryId || this.locationVal || this.language) {
      this.AllCategoryList()
    } else {
      
      this.lawyersList()
    }
  }


  ngOnInit(): void {
    this.locationVal = this.activatedRoute.snapshot.queryParams['city'];
    this.categoryId = this.activatedRoute.snapshot.queryParams['category'];
    this.language = this.activatedRoute.snapshot.queryParams['language'];
    console.log(this.language, this.categoryId,   this.locationVal )
      
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      if (this.categoryId || this.locationVal || this.language) {
        this.AllCategoryList()
      } else {
        
        this.lawyersList()
      }
  })
  

    this.imgUrl = this._appConfig.IMG_Url;
    this.filterSearchdeCategory()

    this.getcategoryList()

     
   this.lawyerListBasedOnCategory()

  
    this.dropdownSettings = {
      singleSelection: true,
      idField: "id",
      textField: "category_name",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      closeDropDownOnSelection: 'true',
      allowSearchFilter: true
    };
    this.dropdownSettings1 = {
      singleSelection: true,
      idField: "name",
      textField: "name",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      closeDropDownOnSelection: 'true',
      allowSearchFilter: true
    };
    this.dropdownSettings2 = {
      singleSelection: true,
      idField: "text",
      textField: "text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      closeDropDownOnSelection: 'true',
      allowSearchFilter: true
    };
    this.dropdownSettings3 = {
      singleSelection: true,
      idField: "value",
      textField: "name",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      closeDropDownOnSelection: 'true',
      allowSearchFilter: true
    };

    this.dropdownSettings4 = {
      singleSelection: true,
      idField: "name",
      textField: "name",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      closeDropDownOnSelection: 'true',
      allowSearchFilter: true
    };
    this.dropdownSettings5 = {
      singleSelection: true,
      idField: "name",
      textField: "name",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      closeDropDownOnSelection: 'true',
      allowSearchFilter: true
    };

    window.scrollTo(0, 0);

   

  }

lawyerListBasedOnCategory(){
  this.userService.lawyerAllList.subscribe(res =>{
    if(res){
      this.categoryId = res;
        this.AllCategoryList()
       this.filterSearchdeCategory()
    }
  })
}


  lawyers_details(obj: any) {
    this.router.navigate(['/lawyer_details/' + obj.id])
  }
  onItemSelect(item: any) {
    this.filterData()

  }

  onItemDeselect(item: any) {
    this.selectedItems = []
    this.filterData()

  }

  onItemSelect1(item: any) {
    this.filterData()

  }

  onItemDeselect1(item: any) {
    this.selectedItems1 = []
    this.filterData()

  }

  onItemSelect2(item: any) {
    this.filterData()

  }

  onItemDeselect2(item: any) {
    this.selectedItems2 = []
    this.filterData()
  }

  onItemSelect3(item: any) {
    this.filterData()

  }

  onItemDeselect3(item1: any) {
    this.selectedItems3 = []
    this.filterData()
  }

  onItemSelect4(item: any) {
    this.filterData()

  }

  onItemDeselect4(item: any) {
    this.selectedItems4 = []
    this.filterData()

  }

  onItemSelect5(item: any) {
    this.filterData()
  }

  onItemDeselect5(item: any) {
    this.selectedItems5 = []
    this.filterData()
  }

  filterData(){
    this.lawyerList.lawyersGet('', '').subscribe((res: any) => {
      if (res.success) {
        this.filteredLawyersData = res.data;
        let filteredOptions:any[]= res.data;
        if(this.selectedItems[0]){
          filteredOptions = filteredOptions.filter((x:any) => x.primary_category_id[0].id == this.selectedItems[0].id)
        }
        if(this.selectedItems1[0]){
          filteredOptions = filteredOptions.filter((x:any) => x.city_name == this.selectedItems1[0].name)
        }
        if(this.selectedItems2[0]){
          filteredOptions = filteredOptions.filter((x:any) => x.court.includes(this.selectedItems2[0].text) )
        }
        if(this.selectedItems3[0]){
          if (parseInt(this.selectedItems3[0].value) == 4) {
            filteredOptions = filteredOptions.filter((x:any) => parseInt(x.year_of_practice) <= parseInt(this.selectedItems3[0].value))
          } else if (parseInt(this.selectedItems3[0].value) == 5) {
            filteredOptions = filteredOptions.filter((x:any) => parseInt(this.selectedItems3[0].value) <= parseInt(x.year_of_practice) && parseInt(x.year_of_practice) <= 10)
          } else if (parseInt(this.selectedItems3[0].value) == 10) {
            filteredOptions = filteredOptions.filter((x:any) => parseInt(this.selectedItems3[0].value) < parseInt(x.year_of_practice) && parseInt(x.year_of_practice) <= 15)
          } else if (parseInt(this.selectedItems3[0].value) == 15) {
            filteredOptions = filteredOptions.filter((x:any) => parseInt(x.year_of_practice) > 15)
          }
        }
        if(this.selectedItems4[0]){
          filteredOptions = filteredOptions.filter((x:any) => x.languages.split(',').includes(this.selectedItems4[0].name) )
        }
        if(this.selectedItems5[0]){
          filteredOptions = filteredOptions.filter((x:any) => x.gender == this.selectedItems5[0].name)
        }
        this.lawyersListData = filteredOptions;
      }
    })
  }

  getCourts() {
    this._categoryService.getCourts().subscribe((res: any) => {
      this.courts = res;
      this.getCities()
    })
  }

  getCities() {
    this.cityList = [];
    this._categoryService.getCities().subscribe((res: any) => {
      this.cityList = res;
      // $('.selectpicker').selectpicker();
    })
  }

  @HostListener('window:scroll', ['$event']) onscroll() {

    if (window.scrollY > 280) {
      this.navbarfixed = true;
    } else {
      this.navbarfixed = false
    }

  }
  categorySearchedName:any[]=[]

  filterSearchdeCategory():any{
    this._categoryService.listCategory().subscribe((data:any) => {
      if(data){
        let searchCategoryName = data.filter((ev:any) =>{
          if(ev.id == this.categoryId ){
          return ev
          }
        })
        this.categorySearchedName = searchCategoryName
       
      }
    })
  }

  getcategoryList(): any {
    this.getCourts()
    this._categoryService.listCategory().subscribe((data:any) => {
 
      if (data.length > 0) {

        let categoryData = data.filter((val: any) => {
          return val.status === true
        })
        this.categoryList = categoryData;
        // console.log(this.categoryList)
  
        // this.selectedItems.push({id: parseInt(this.categoryId), category_name: this.categoryList.filter((x:any) => x.id == this.categoryId)[0].category_name })
      } else {
        this.categoryList = []
      }

    }, err => {
      this.categoryList = []
    })
  }

  filteredLawyersData: any[] = []

  AllCategoryList() {
    if(this.locationVal){
      this.geocoder.geocode({ 'address': this.locationVal }, (results: any, status: any) => {
        if (status === 'OK' && results[0]) {
          this.latitude = results[0].geometry.location.lat();
          this.longitude = results[0].geometry.location.lng();
        }
      })
    }
    
    let reqObj = {
      category: this.categoryId,
      location: this.locationVal,
      language: this.language,
      latitude: this.latitude ? this.latitude : '',
      longitude: this.longitude ? this.longitude : ''
    }
    this.portalService.nearBySearch(reqObj).subscribe((res: any) => {
      if (res) {
        this.lawyersListData = res;
        this.filteredLawyersData = res;
      }

    })
  }
  lawyersList() {
    if(this.latitude && this.longitude){
      this.lawyerList.lawyersGet(this.latitude, this.longitude).subscribe((res: any) => {
        if (res.success) {
          this.lawyersListData = res.data;
          this.filteredLawyersData = res.data;
  
        }
      })
    }else{
      this.lawyerList.lawyersGet('', '').subscribe((res: any) => {
        if (res.success) {
          this.lawyersListData = res.data;
          this.filteredLawyersData = res.data;
  
        }
      })
    }
    
  }

}


