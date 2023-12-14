import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { appconfig } from 'src/providers/appconfig';
import { DocumentService } from 'src/services/document.service';
import { PaymentService } from 'src/services/payment.service';
import { UserregistationService } from 'src/services/userregistation.service';
import { UserloginComponent } from '../header/userlogin/userlogin.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ThankPopUPComponent } from '../intellectual-property-assignment-agreement/intellectual-property-assignment-agreement.component';
export type Config = {
  multi?: boolean
};

declare var Razorpay: any;

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.scss']
})
export class StartupComponent implements OnInit {

  options: Config = { multi: false };
  config!: Config;

  documentDetailsObj:any;

  documentTitle:any;
  imgUrl:any;

  razorpay: any;

  
  latitude:any
  longitude:any;
  country:any
  constructor(public documentService: DocumentService,public router:Router, public dialog: MatDialog,private http: HttpClient,public paymentServices: PaymentService, public userService:UserregistationService, public _appConfig: appconfig,) { }

  ngOnInit(): void {
    this.imgUrl = this._appConfig.IMG_Url;
    let url:any = document.URL.split('/')[document.URL.split('/').length - 1]
    this.documentTitle = url.replaceAll('-', ' ')
    this.config = this.mergeConfig(this.options);
    this.getDetails()

    this.updateDocData()

    if (localStorage.getItem('user-token')) {
      this.getProfileDetails()
      this.getProfileData()
    }

    window.scrollTo(0, 0)

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

  updateDocData(){
    this.userService.servicedoc.subscribe(res =>{
      console.log(res)
      if(res){
        this.documentTitle = res
        this.getDetails()
        setTimeout(() => {
          location.reload()
        }, 600);
      }
    })
  }

  getDetails(){
    this.documentService.getStartupDetails(this.documentTitle).subscribe(res=>{
      if(res.length > 0){
        this.documentDetailsObj = res[0];
        this.getTotalAmount()

    

      }
    })
  }

  totalAmount:any = 0;
  ustotalAmount:any = 0
  docAmount:any 
  getTotalAmount(){
   this.totalAmount = this.documentDetailsObj.offer_price
   this.ustotalAmount = this.documentDetailsObj.us_offer_price

   if( this.country == 'India'){
    this.docAmount =  this.totalAmount
  } else if(this.country == 'United States'){
    this.docAmount = this.ustotalAmount
  } else {
    this.docAmount = this.ustotalAmount
  }

  }

  mergeConfig(options: Config) {
    const config = {
      multi: true
    };

    return { ...config, ...options };
  }


  toggle(index: number) {
    if (!this.config.multi) {
      this.documentDetailsObj.faq.filter(
        (menu:any, i:any) => i !== index && menu.active
      ).forEach((menu:any) => menu.active = !menu.active);
    }

    this.documentDetailsObj.faq[index].active = !this.documentDetailsObj.faq[index].active;
  }


  user_Profile: any
  userId:any
  userDetails:any
  getProfileDetails() {
    this.userService.getProfileDetails().subscribe(res => {
      if (res.length > 0) {
        this.userId = res[0].id
        this.userDetails = res[0];
        let userprofile = this.userDetails.profile_pic
        this.user_Profile = userprofile
        console.log( this.userDetails)


        this.razorpay = {
          key: 'rzp_test_kiShCWkIktNxPI',
          amount: this.totalAmount * 100, // The payment amount in paise or the smallest currency unit
          // amount:100,
          currency: 'INR', // Currency code
          name: 'JUST DIAL LAW',
          status: "captured",
          description: 'Test Transaction',
          image: '/assets/img/logo-icon.png', // Logo URL
          order_id: '', // The order ID generated from your backend
          handler: this.paymentHandler.bind(this),
          // prefill: {
          //   name: 'Sai Krishna',
          //   email: 'Sai@gmail.com',
          //   contact: '8179857781',
          // },
          theme: {
            color: '#1d439f',
          },
        };



      }
    })
  }

  getProfileData() {
    this.userService.userData.subscribe(res => {
      if (res) {
        this.getProfileDetails()
      }
    })
  }


  openUserDialog() {
    const dialogRef = this.dialog.open(UserloginComponent, {
      panelClass: 'login-modal',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        if (localStorage.getItem('userData')) {
          this.userService.clintProfileData(res)
          this.getProfileDetails()
          this.getProfileData()
        }
      }
    })
  }

  buyDocument(){
    if (localStorage.getItem('user-token')) {
      this.paymentPro()

    } else {
      this.openUserDialog()
    }


  }

  paymentOrderId:any
  paymentSuccsess: any
  paymentPro() {
    let reqData = {
      amount: this.docAmount * 100,
      user_id:this.userId,
      category:  this.documentDetailsObj.startup_category,
      sub_category: this.documentDetailsObj.startup_sub_category ,
      document_or_startup:'Startup'

    }
    this.paymentServices.documentBuyOrderIdApi(reqData).subscribe((res: any) => {
      if (res.data.id, res.data.amount) {
        this.paymentOrderId = res.data.id
        this.initiatePayment(res.data.id)
      }
    })
  }


  paymentHandler(response: any) {
    console.log(response);
    console.log(this.paymentOrderId)

    this.paymentSuccsess = response
    let reqData = {
      razorpay_order_id: this.paymentOrderId,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature:response.razorpay_signature,
    }
    if (response.razorpay_payment_id) {
      this.paymentServices.documentSendPaymentData(reqData).subscribe((res: any) => {
        if (res) {

        //  this.router.navigate(['/home'])
        //  setTimeout(() =>{
        //   location.reload()
        //  },2000)
       console.log(res)
        setTimeout(() => {
          const dialogRef = this.dialog.open(ThankPopUPComponent, {
            panelClass: 'login-modal',
          //  data:res.patment_data[0].document_or_startup_sub_category
          });
          dialogRef.afterClosed().subscribe(res => {
            if (res) {
            
            }
          })
        }, 4000);

        }
      })



      // let reqDat = {
      //   date: this.selectedDate,
      //   timeslot: this.slotsBookinId,
      //   appointment_type: this.AppointmentType,
      //   appointment_detail: this.caseDetalisForm.value.appointment_detail
      // }

      // this.userService.bookingTimeSlots(reqDat).subscribe((res: any) => {
      //   console.log(res)
      //   if (res.appointmet_data[0].id) {
      //     if (localStorage.getItem('user-token')) {
      //       // this.bookinId = res.appointmet_data[0].id
      //       // this.router.navigate(['/appointment_confirmed/' + this.bookinId])
      //       // this.confirmMailsSending()
      //     }
      //   } else {

      //   }
      // })

    }


  }

  initiatePayment(orderId: any) {
    console.log(orderId)
    this.razorpay.order_id = orderId;
    let razPay: any = new Razorpay(this.razorpay)
    // razPay.order_id = orderId;
    razPay.open();
  }


}
