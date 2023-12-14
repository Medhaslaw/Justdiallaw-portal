import { Component, Input, KeyValueDiffer, KeyValueDiffers, OnInit } from '@angular/core';
import { appconfig } from 'src/providers/appconfig';
import { CategoryService } from 'src/services/category.service';
import * as AOS from 'aos';
import { LawyerslistService } from 'src/services/lawyerslist.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PortalService } from 'src/services/portal.service';
import { allCategoryInterFace } from '../components/lawyer-info/models/category';
import { PrivacyDialogComponent } from '../privacy-dialog/privacy-dialog.component';
import { MatDialog } from '@angular/material/dialog';


declare var google:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  imgUrl: any
  categoryList: any;
  selected1 = '1';
  lawyersListData: any;
  topLawyers: any
  categoryId: any = ''
  searchFiled: any
  eveData: any
  values: any = ''
  categoryName: any
  categorylength: any
  hideLabel: boolean = true;
  showDots: boolean = false;

  topOneBlog: any;
  topBlogs: any;

  selectedLang: any = '';

  loc: any

  public langugaes: any[] = [
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

  dropdownSettings: any = {};
  dropdownSettings1: any = {};
  dropdownSettings2: any = {};
  selectedItems: any[] = [];
  selectedItems1: any[] = [];
  selectedItems2: any[] = [];
  geocoder: any;  

  isTermsAccepted!: boolean;


  constructor(public _categoroysSrtvice: CategoryService,
    public fb: FormBuilder,
    public _appConfig: appconfig, public lawyerList: LawyerslistService,
    public portalService: PortalService,
    public router: Router,
    public _categoryService: CategoryService,
    public dialog: MatDialog,
  ) { 
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.geocoder = new google.maps.Geocoder;

    this.isTermsAccepted = sessionStorage.getItem('termsAccepted') === 'true';
  }

  autocompleteItems:any[]=[]
  onAutocompleteSelected(ev:any){
    this.autocompleteItems = []
    this.GoogleAutocomplete.getPlacePredictions({ input: ev.target.value },
      (predictions: any, status: any) => {
          predictions.forEach((prediction: any) => {
            this.autocompleteItems.push(prediction);
            console.log(this.autocompleteItems)
          });
      });
   
  }

  selectArea(obj: any) {
    this.geocoder.geocode({ 'placeId': obj.place_id }, (results: any, status: any) => {
      if (status === 'OK' && results[0]) {
        this.latitude = results[0].geometry.location.lat();
        this.longitude = results[0].geometry.location.lng();
        results[0].address_components.forEach((address:any)=>{
          if(address.types.includes("locality")){
            this.formattedCity = address.short_name;
          }
        })
      }
    })
  }

  latitude:any;
  longitude:any;
  formattedCity:any;
  GoogleAutocomplete: any;
  getCity(){
    this.geocoder.geocode({ 'location':  {
      lat: this.latitude,
      lng: this.longitude
    }
   }, (results: any, status: any) => {
      if (status === 'OK' && results[0]) {
        results[0].address_components.forEach((address:any)=>{
          if(address.types.includes("locality")){
            this.selectedCity = address.short_name;
            this.formattedCity = address.short_name;
          }
        })
      }
    })
  }
  selectedCity:any;
  ngOnInit(): void {

    if(!localStorage.getItem('lawyer-token')){
    this.getcategoryList()
    this.imgUrl = this._appConfig.IMG_Url;
    // this.lawyersList()
    this.getTopBlogs()
    this.getTopLawyers()
    this.getCities()

    // window.onscroll = function() {scrollFunction()};

    // function scrollFunction() {
    //   if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    //     // document.getElementById("header").style.fontSize = "30px";
    //   } else {
    //     // document.getElementById("header").style.fontSize = "90px";
    //   }
    // }


    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
       this.getCity()
    })
    }

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
      idField: "name",
      textField: "name",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      closeDropDownOnSelection: 'true',
      allowSearchFilter: true
    };



    if(this.isTermsAccepted == false){
    const dialogRef = this.dialog.open(PrivacyDialogComponent, {
      panelClass: 'login-modal',
      autoFocus: false,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        
      }

    })
  }

  
  window.scrollTo(0, 0);
  
} else {
  this.router.navigate(['/lawyer-jdl/profile'])
}


  }



  ngAfterViewInit() {
    AOS.init({
      once: true
    });
  }


  

  slides = [
    {content:'From the moment I reached out to them, their team demonstrated unmatched professionalism and deep expertise in the field. They took the time to understand my unique situation and provided clear guidance every step of the way.'},
    {content:'The dedication and attention to detail they showed during my case were truly remarkable. I am incredibly grateful for their support and highly recommend their services to anyone seeking top-notch legal assistance.'},
    {content:' I was facing a complex legal issue and sought help from this firm. Their team provided me with expert guidance and personalised attention, making me feel valued and understood throughout the process.'},
    {content:'The professionalism and dedication they exhibited were truly commendable. I am grateful for their strategic approach that led to a favourable outcome. '},
    {content:'They guided me through a complex legal matter with utmost professionalism, ensuring that I understood every step of the process. Their attention to detail and personalised approach made me feel valued as a client.'},
    {content:' Their expertise in the field was evident as they provided me with clear guidance and a strategic approach to my case. They communicated promptly, ensuring I was always informed about the progress. Thanks to their hard work and dedication, I achieved a favorable outcome that exceeded my expectations'},
   
  ];
  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    'nextArrow': '<button class="navs previous"><i class="bi bi-chevron-right"></i></button>',
    'prevArrow': '<button class="navs next"><i class="bi bi-chevron-left"></i></button>'
  };

  onItemSelect(item: any) {
    // this.selectedItems.push(item);
    this.categoryId = this.selectedItems[0].id;
  }

  onItemDeselect(item: any) {
    this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
    this.categoryId = '';
  }

  onItemSelect1(item: any) {
    // this.selectedItems1.push(item);
    this.selectedLang = this.selectedItems1[0].name;
  }

  onItemDeselect1(item: any) {
    this.selectedItems1.splice(this.selectedItems1.indexOf(item), 1);
    this.selectedLang = ''

  }

  onItemSelect2(item: any) {
    // this.selectedItems2.push(item);
    this.values = this.selectedItems2[0].name;
  }

  onItemDeselect2(item: any) {
    this.selectedItems2.splice(this.selectedItems2.indexOf(item), 1);
    this.values = ''
  }

  slickInit(e: any) {
  }

  breakpoint(e: any) {
  }

  afterChange(e: any) {
  }

  beforeChange(e: any) {
  }

  getcategoryList(): any {
    this._categoroysSrtvice.listCategory().subscribe((data: allCategoryInterFace[]) => {
      if (data.length > 0) {
        let categoryData = data.filter((val: any) => {
          return val.status === true
        })
        this.categoryList = categoryData;
      } else {
        this.categoryList = []
      }

    }, err => {
      this.categoryList = []
    })
  }
  cityList: any[] = []
  getCities() {
    this.cityList = [];
    this._categoryService.getCities().subscribe((res: any) => {
      this.cityList = res;

    })
  }

  categoryWise(category: any) {
    this.router.navigate(['/lawyers-list'],
      { queryParams: { category: category.id, city: '', language: '' } })
  }

  lawerDetails(obj: any) {
    this.router.navigate(['/lawyer_details/' + obj.id])
  }

  selectCat(obj: any) {
    this.categoryId = obj.id;
    this.categoryName = obj.category_name.slice(0, 6)
    this.hideLabel = false
    this.showDots = true
  }

  allCat() {
    this.router.navigate(['/categories'])
  }


  searchaLawyer() {
    
    this.router.navigate(['/lawyers-list'],
      { queryParams: { category: this.categoryId, city: this.formattedCity, language: this.selectedLang } })
    
  }


  lawyers() {
    this.router.navigate(['/lawyers-list'],
      { queryParams: { category: this.categoryId, city: this.formattedCity, language: this.selectedLang } })
  }

  getTopLawyers() {
    this.portalService.top_lawyers().subscribe((res: any) => {
      if (res.success) {
        this.topLawyers = res.data
      }
    })
  }

  getTopBlogs() {

    this.portalService.top_AdminBlogs().subscribe((res: any) => {
      if (res.success) {
        this.topOneBlog = res.data[0]
        this.topBlogs = res.data
      }
    })
  }

  allBlogs() {
    this.router.navigate(['/blog'])
  }

  viewBlog(blogObj: any) {
    let reqData = {
      blog_id: blogObj.id
    }
    this.portalService.viewsCount(reqData).subscribe((res: any) => {
      this.router.navigate(["blog-details/" + blogObj.title.toLowerCase().replaceAll(' ', '-') + '/' + blogObj.id+'/'+ blogObj.created_by.role ])
    })

  }

  knowMore(){
    this.router.navigate(['/about-us'])
  }

}

