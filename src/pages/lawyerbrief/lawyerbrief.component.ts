import { DatePipe } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { appconfig } from 'src/providers/appconfig';
import { PortalService } from 'src/services/portal.service';
import { UserregistationService } from 'src/services/userregistation.service';
import { UserloginComponent } from '../header/userlogin/userlogin.component';
import { filter, pairwise } from 'rxjs/operators';
import { Location } from '@angular/common';
import { PaymentService } from 'src/services/payment.service';
import { HttpClient } from '@angular/common/http';

declare var Razorpay: any;

@Component({
  selector: 'app-lawyerbrief',
  templateUrl: './lawyerbrief.component.html',
  styleUrls: ['./lawyerbrief.component.scss']
})

export class LawyerbriefComponent implements OnInit {


  items = [
    { text: 'A', background:'#e4f7e1 ',border: '#d1e9b7' },
    { text: 'B', background:'#dfe9f3 ',border: '#d3dee8' },
    { text: 'C', background:'#f7f0e0',border: '#f9d0b5' },
   
];



  reviewsList: any[] = []
  evngSlots: any
  aftSlots: any
  mrgSlots: any
  todayDate: any
  allDates: any[] = []
  startTime: any[] = []
  allslots: any
  userDetails: any
  userId: any
  id: any
  AllslotsCount: any
  lawyerData: any
  slotsBookinId: any
  imgUrl: any
  bookinId: any
  bookedTimeSlotsId: boolean = false
  index = 0
  selectedIndexDate: any
  bookedSlots: any[] = []
  selectedDate: any
  matchSlotsId: any
  AvailableSlotsCount: any[] = []
  bookedSlotsId: any

  allBlogsObj: any[] = []

  blockedTimeSlots: any[] = []

  todayDateTime: Date = new Date()
  todayDatePipe: any
  todayTimePipe: any

  caseDetalisForm!: FormGroup;

  timeSlotsId: any[] = []

  priviseRouter: any

  razorpay: any;
  paymentOrderId: any

  paymentSuccsess: any

  constructor(public userService: UserregistationService,
    private route: ActivatedRoute,
    public portalService: PortalService,
    private router: Router,
    public _appConfig: appconfig,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private toastr: ToastrService,
    public datePipe: DatePipe,
    public fb: FormBuilder,
    private location: Location,
    public paymentServices: PaymentService
  ) {

    //   this.router.events.pipe(pairwise()).subscribe((event:any) => {
    //     // console.log(event[0].url); // NavigationEnd will have last and current visit url
    // });





  }

  ngOnInit(): void {
    let url = document.URL.split('/')[document.URL.split('/').length - 1]
    this.id = url
    this.imgUrl = this._appConfig.IMG_Url;

    //  this.priviseRouter =   this.router.navigate([this.portalService.previousRoutePath.value]);

    //  console.log( this.priviseRouter)

    this.caseDetalisForm = this.fb.group({
      appointment_detail: ['', [Validators.required,]]
    })
    this.todayDatePipe = this.datePipe.transform(this.todayDateTime, 'yyyy-MM-dd')
    this.todayTimePipe = this.datePipe.transform(this.todayDateTime, 'HH:mm')

    // this.goToPrevious()

    this.TimeSlots()
    this.getLawyer()
    this.getlawyerBlogs()
    if (localStorage.getItem('user-token')) {
      this.getProfileDetails()
      this.getProfileData()
    }


    window.scrollTo(0, 0);



  }





  back(): void {
    this.location.back();
  }

  // goToPrevious(): void {
  //   let previous = this.portalService.getPreviousUrl();

  //   console.log(previous)

  // }


  user_Profile: any
  getProfileDetails() {
    this.userService.getProfileDetails().subscribe(res => {
      if (res.length > 0) {
        this.userId = res[0].id
        this.userDetails = res[0];
        let userprofile = this.userDetails.profile_pic
        this.user_Profile = userprofile
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

  selectDate(dateObj: any) {
    this.selectedDate = dateObj;
    this.alredyBookedSlots()
    this.alredyBlockedTimeSlots()
    this.availableTimeSlots()
  }
todayAvailable_slots:any
  TimeSlots() {
    this.portalService.getAllDates(this.id).subscribe((res: any) => {
      if (res) {
        res.data.forEach((slot: any) => {
          this.allDates.push(slot)
        })
        this.todayDate = res.data
        this.selectedDate = this.allDates[0].date
        this.alredyBookedSlots()
        this.alredyBlockedTimeSlots()
        this.availableTimeSlots()

        this.todayAvailable_slots = this.allDates[0].Available_slots
       
       
      }
    })
  }

  lawyerStartTime: any
  lawyerEndTime: any
  lawyerVaction: boolean = true
  lawyerMsg: any

  timeSlotsAllData: any

  availableTimeSlots() {

    this.userService.allTimeSlots(this.id, this.selectedDate).subscribe((res: any) => {
      if (res) {
        this.timeSlotsAllData = res

        this.lawyerVaction = true
        this.startTime = res

        this.lawyerStartTime = res[0].Advocate_start_time,
          this.lawyerEndTime = res[0].Advocate_end_time

        let mrgTimeSlots = res.filter((value: any) => {
          let filterTime = value.Advocate_timing_slot
          return '12:00' >= filterTime
        })
        this.mrgSlots = mrgTimeSlots

        let aftTimeSlots = res.filter(function (value: any) {
          let filterTime = value.Advocate_timing_slot
          return '12:00' < filterTime && '16:00' > filterTime
        })
        this.aftSlots = aftTimeSlots

        let evngTimeSlots = res.filter(function (value: any) {
          let filterTime = value.Advocate_timing_slot
          return '16:00' <= filterTime
        })
        this.evngSlots = evngTimeSlots

       
     
        console.log(this.todayAvailable_slots)
        console.log(this.timeSlotsAllData.length)

       
        

       

      }
    }, error => {
      if (error.error.data) {
        this.lawyerVaction = false
      }
    }

    )
  }

  getLawyer() {
    this.portalService.lawyerDet(this.id).subscribe((res: any) => {
      if (res.length > 0) {
        this.lawyerData = res[0]
        this.reviewsList = res[0].reviews.reverse()


        this.razorpay = {
          key: 'rzp_test_kiShCWkIktNxPI',
          amount: this.lawyerData?.payment_fees[0]?.phone_consultation_fees * 100, // The payment amount in paise or the smallest currency unit
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

  slotsBooked(data: any) {
    console.log(data)
    if (this.bookedSlots.includes(data)) {
      this.toastr.error('This Time Slots Already Booked', 'Error!');
    } else if (data.status === 'blocked') {
      this.toastr.error('This Time Slots Lawyer Blocked', 'Error!');
    }
    else {
      this.slotsBookinId = data
    }
  }

  isActive(slot: any) {
    return this.slotsBookinId === slot
  }


  // isBlocked(id:any){
  //   return  this.timeSlotsId === id 
  // }

  alredyBookedSlots() {
    this.bookedSlots = [];
    this.userService.bookedSlots(this.id, this.selectedDate).subscribe((res: any) => {
      
      if (res.length > 0) {
       
        res.forEach((slot: any) => {
          this.bookedSlots.push(slot.timeslot.id)
        })
       
        setTimeout(() => {
          this.evngSlots.forEach((slot: any) => {
            if (this.bookedSlots.includes(slot.id)) {
              slot.isBooked = true;
            }
          })
        }, 500)

      }
    })
  }

  getClass(obj: any) {
    return this.bookedSlots.includes(obj.id)
  }

  alredyBlockedTimeSlots() {
    this.blockedTimeSlots = []
    this.portalService.allBlockedSlots(this.id, this.selectedDate).subscribe((res: any) => {
  
      if (res) {
        res.data.forEach((blocked_slots: any) => {
          this.blockedTimeSlots.push(blocked_slots.id)
        })
      }
    })

  }

  confirmMailsSending() {
    if (localStorage.getItem('user-token')) {
      this.userService.sendingMails(this.userId, this.id, this.slotsBookinId, this.selectedDate,).subscribe((res: any) => {
      })
    }
  }


  AppointmentType: any = 'online'
  appointmentType(val: any) {
    this.AppointmentType = val
    if (val === 'online') {
      this.showTimeSlots = true
    }


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


  proceedToBook() {
    if (localStorage.getItem('user-token')) {
   
     
        if (this.slotsBookinId && this.caseDetalisForm.valid) {
        this.paymentPro()

        if (this.paymentSuccsess) {

        }
      } else {
        this.toastr.warning('Please Selecte The Time Slots And Write Message About The Case!', 'warning!');
      }
   

    }
    else {
      this.openUserDialog()
    }
  }

  getDirections(){
    window.open('https://maps.google.com/?q='+this.lawyerData?.lattitude+','+this.lawyerData?.longitude)
  }

  
  paymentPro() {
    let reqData = {
      amount: this.lawyerData?.payment_fees[0]?.phone_consultation_fees * 100,
      lawyer_id:this.lawyerData.id

    }
    this.paymentServices.orderIdApi(reqData).subscribe((res: any) => {
      if (res.data.id, res.data.amount) {
        this.paymentOrderId = res.data.id
        this.initiatePayment(res.data.id)
      }
    })
  }


  paymentHandler(response: any) {
    this.paymentSuccsess = response
    let reqData = {
      razorpay_order_id: this.paymentOrderId,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature:response.razorpay_signature,
    }
    if (response.razorpay_payment_id) {
      this.paymentServices.sendPaymentData(reqData).subscribe((res: any) => {
      
        if (res) {
          let reqDat = {
            date: this.selectedDate,
            timeslot: this.slotsBookinId,
            appointment_type: this.AppointmentType,
            appointment_detail: this.caseDetalisForm.value.appointment_detail
          }
          this.userService.bookingTimeSlots(reqDat).subscribe((res: any) => {
            if (res.appointmet_data[0].id) {
                this.bookinId = res.appointmet_data[0].id
                this.router.navigate(['/appointment_confirmed/' + this.bookinId])
                setTimeout(() =>{
                
                 location.reload()
                },2000)

             
                // this.confirmMailsSending()
             
                this.updatePayment()
            } 
            
          })
        }
      })
    }
  }


updatePayment(){
 if(this.paymentOrderId && this.bookinId){
let   reqData = {
  order_id:this.paymentOrderId,
  appointment_id:this.bookinId
  }
  this.paymentServices.PaymentDetails(reqData).subscribe((res:any) =>{
    if(res){
      console.log(res)
    }
  })
 } 
}


  initiatePayment(orderId: any) {
    console.log(orderId)
    this.razorpay.order_id = orderId;
    let razPay: any = new Razorpay(this.razorpay)
    // razPay.order_id = orderId;
    razPay.open();
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

  viewBlog(ele: any) {
    this.router.navigate(["blog-details/" + ele.title.toLowerCase().replaceAll(' ', '-') + '/' + ele.id + '/' + ele.created_by[0].role])
  }
  getlawyerBlogs() {
    this.portalService.lawyerBlogs(this.id).subscribe((res: any) => {
      if (res) {
        this.allBlogsObj = res

      }
    })
  }




  public moveToStructure():void{
    this.router.navigate( ['routeexample1' ], {fragment: 'structure'});
  }

}

@Component({
  selector: 'app-click-to-call',
  templateUrl: './clicktocall.html',
  styleUrls: ['./lawyerbrief.component.scss']
})

export class clickToCall {

  latitude:any
  longitude:any
  country:any

  constructor(public dialogRef: MatDialogRef<clickToCall>,
    public fb: FormBuilder, private http: HttpClient,

    @Inject(MAT_DIALOG_DATA) public data: any,
    // public toastr: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.data

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
            console.log(this.country )
            break;
          }
        }
      }
    });
  }

  goWebWhatsApp() {

    if(this.country == ''){
      window.open('https://api.whatsapp.com/send/?phone=9142846846', "_blank");
    } else if(this.country == ''){
      window.open('https://api.whatsapp.com/send/?phone=17327435279', "_blank");
    }else {
      window.open('https://api.whatsapp.com/send/?phone=17327435279', "_blank");
    }
  }

  cloceDialog(){
    this.dialogRef.close()
  }
}

