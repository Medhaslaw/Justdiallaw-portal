import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/theme/theme.service';
import { clickToCall } from '../lawyerbrief/lawyerbrief.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  latitude:any
  longitude:any
  country:any

  constructor(private themeService: ThemeService, private http: HttpClient, public dialog: MatDialog,) { }

  ngOnInit(): void {
    const active = this.themeService.getActiveTheme() ;
    this.themeService.setTheme('light');

    window.onscroll = function() {myFunction()};

    let header:any = document.getElementById("myHeader");
    let sticky = header.offsetTop;
    
    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }
    

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

  slickInit(e: any) {
  }

  breakpoint(e: any) {
  }

  afterChange(e: any) {
  }

  beforeChange(e: any) {
  }

  mailtoJustLaw(){
    window.open('mailto:support@justdiallaw.com', "_blank");
  }

  mailtoJustLawUsa(){
    window.open('mailto:Support@justdiallaw.com', "_blank");
  }

  showTimeSlots: boolean = true
  callDialog() {
    const dialogRef = this.dialog.open(clickToCall,
      {
        panelClass: 'link-modal',
        data: this.showTimeSlots = false,
        disableClose: true,
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      // this.showTimeSlots = true
    });

  }

}
