import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PortalService } from 'src/services/portal.service';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  options: any;
  submitted:any
    readyToLaunch!:FormGroup;

    latitude:any
    longitude:any
    country:any
  constructor(public fb : FormBuilder,
    public portalService: PortalService,
    public toastr: ToastrService,
    private http: HttpClient,
    ) { }

  ngOnInit(): void {
    this.options = {
      center: {lat: 36.890257, lng: 30.707417},
      zoom: 12
  };

  this.readyToLaunch = this.fb.group({
    first_name: ['', [Validators.required,]],
    last_name: ['', [Validators.required,]],
    email:['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    phone_no: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    message: ['', [Validators.required ]],
    type_contact_or_enquiry:'Contact Us'
  })
  

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
  window.scrollTo(0, 0);

  }

  keyPressAlphaNumeric(event:any) {

    console.log(event)

    if(!this.readyToLaunch.value.first_name){
      let imp = event.keyCode
      if(imp == 32){
        return false
      } else {
        return true
      }
    } else{
        
      return true
    }

 
    // if(!this.readyToLaunch.value.first_name){
    //  var inp = String.fromCharCode(event.keyCode);
    // if (/[a-zA-Z]/.test(inp)) {
    //   return true;
    // } else {
    //   event.preventDefault();
    //   return false;
    // }
    // } else {

    //   if(/[a-zA-Z]/){
    //     return true
    //   } else {
    //     return false
    //   }
     
    // }


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
  


getInTouch(){
  if(this.readyToLaunch.valid){
  this.portalService.enquirysPost(this.readyToLaunch.value).subscribe((res:any) =>{
    if(res){
      this.toastr.success('Our team will respond you soon!', 'Success!');
     setTimeout(() =>{
      location.reload()
     },1000)
    }
  })

}

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


}
