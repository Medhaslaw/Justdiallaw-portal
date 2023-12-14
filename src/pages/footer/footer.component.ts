import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/services/category.service';
import { PortalService } from 'src/services/portal.service';
import { UserregistationService } from 'src/services/userregistation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  getInTouch!: FormGroup;

  categorysList: any
  latitude:any
  longitude:any
  country:any
  constructor(
    public fb: FormBuilder,
    public portalService: PortalService,
    public toastr: ToastrService,
    public _categoroysSrtvice: CategoryService,
    public router: Router,
    public userService: UserregistationService,
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {

    this.getInTouch = this.fb.group({
      first_name: ['', [Validators.required,]],
      last_name: ['', [Validators.required,]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      phone_no: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      message: ['', [Validators.required]],
      type_contact_or_enquiry: 'Enquiry'
    })

    this.getCategorys()

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        // this.latitude = 	29.749907,
        // this.longitude =-95.358421
        this.getCountryFromCoordinates()
        
      });
    } else {
      console.log("Geolocation is not available in this browser.");
    }

  }

  getCountryFromCoordinates() {
    const apiKey = 'AIzaSyCQQiUFg6UeK0PSvtLqJHduBSoOlBKCC-E';
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.latitude},${this.longitude}&key=${apiKey}`;

    this.http.get(apiUrl).subscribe((response: any) => {
      if (response.status === 'OK') {
        const addressComponents = response.results[0].address_components;
        for (const component of addressComponents) {
          if (component.types.includes('country')) {
            this.country = component.long_name;
            console.log(this.country)
            break;
          }
        }
      }
    });
  }



  userEnquiry() {
    if (this.getInTouch.valid) {
      this.portalService.enquirysPost(this.getInTouch.value).subscribe((res: any) => {
        if (res) {
          this.toastr.success('Your Details submitted Successfully! Our Customer Support will contact you', 'Success!');
          setTimeout(()=>{
            location.reload()
          }, 5000)
        // 
        // // this.getInTouch.reset()
        // // this.document.location.reload();
        // this.ngOnInit()
        }
      })
    }
  }

  getCategorys() {
    this._categoroysSrtvice.listCategory().subscribe((res: any) => {
      if (res.length > 0) {
        let categoryData = res.filter((val: any) => {
          return val.status === true
        })
        this.categorysList = categoryData;
      } else {
        this.categorysList = []
      }
    })
  }


  choiceCategory(category_id: any) {
    this.userService.laywerData(category_id)
    this.router.navigate(['/lawyers-list'],
      { queryParams: { category: category_id, city: '', language: '' } })
    
     
  }

  goMbrSite(){
    window.open('https://www.mbrinformatics.com/', "_blank");
  }

  goJustLawAddress(){
    window.open('https://maps.app.goo.gl/AMTRtqgk4Pi6wS1B6', "_blank");
  }

  goJustLawAddressUsa(){
    window.open('https://goo.gl/maps/R9tyEwpVXqPMhe1U7', "_blank");
  }
  
  mailtoJustLaw(){
    window.open('mailto:support@justdiallaw.com', "_blank");
  }

  mailtoJustLawUsa(){
    window.open('mailto:Support@justdiallaw.com', "_blank");
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

  keyPressNumbers(event:any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  gotofb(){
    window.open('https://www.facebook.com/profile.php?id=61551214194374', "_blank");
  }
gotoLi(){
  window.open('https://www.linkedin.com/company/justdiallaw/', "_blank");
}
gotoTw(){
  window.open('https://twitter.com/JustDialLaw', "_blank");
}

gotoIns(){
  window.open('https://instagram.com/justdial_law?utm_source=qr&igshid=MzNlNGNkZWQ4Mg==', "_blank");
}

}
