import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LawyerloginmodelComponent } from '../header/lawyerloginmodel/lawyerloginmodel.component';
import { clickToCall } from '../lawyerbrief/lawyerbrief.component';
import { HttpClient } from '@angular/common/http';

declare var Pusher:any;

@Component({
  selector: 'app-for-lawyers',
  templateUrl: './for-lawyers.component.html',
  styleUrls: ['./for-lawyers.component.scss']
})
export class ForLawyersComponent implements OnInit {
  lawyerId:any;
  latitude:any
  longitude:any
  country:any
  constructor(public dialog: MatDialog, public router: Router,
    public toastr: ToastrService, private http: HttpClient) { }
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

  ngOnInit(): void {
    if(localStorage.getItem('user-token')){
this.router.navigate(['/home'])
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
          
            break;
          }
        }
      }
    });
  }

  mailtoJustLaw(){
    window.open('mailto:support@justdiallaw.com', "_blank");
  }
  mailtoJustLawUsa(){
    window.open('mailto:Support@justdiallaw.com', "_blank");
  }
  
  lawyerLogin(){
    if(localStorage.getItem('user-token')){
      this.router.navigate(['/home'])
  } else{

    const dialogRef = this.dialog.open(LawyerloginmodelComponent, {
      panelClass: 'login-modal',
      disableClose: true,

    });
      
    dialogRef.afterClosed().subscribe(res => {
      if (res == 'signup') {
        this.router.navigate(['/registationprocess'])


        let data: any = localStorage.getItem('jlLawyerData')
        this.lawyerId = JSON.parse(data)[0].id;
        Pusher.logToConsole = true;
       let  pusher = new Pusher('799ac5b30432874fb622', {
           cluster: 'ap2',
         });
     
         var channel =  pusher.subscribe('bid-user'+this.lawyerId);
         channel.bind('bid-user',(data:any)=>{
           this.toastr.success('Client Send Meeting Notes!', 'Success!');
         } );

         var channel1 =  pusher.subscribe('online-appointments'+this.lawyerId);
         channel1.bind('online-appointments',(data:any)=>{
           this.toastr.success('Client Send Online Appointments!', 'Success!');
         } );

         var channel2 =  pusher.subscribe('doc-share'+this.lawyerId);
          channel2.bind('doc-share',(data:any)=>{
           this.toastr.success('Client Send Documents!', 'Success!');
         } );



      }
    })


  }

  }

}
