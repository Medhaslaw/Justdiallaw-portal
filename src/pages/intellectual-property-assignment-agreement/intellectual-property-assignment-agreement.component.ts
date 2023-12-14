import { Component, Inject, OnInit } from '@angular/core';
import { appconfig } from 'src/providers/appconfig';
import { DocumentService } from 'src/services/document.service';
import { UserregistationService } from 'src/services/userregistation.service';
import { UserloginComponent } from '../header/userlogin/userlogin.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PaymentService } from 'src/services/payment.service';
import { Router } from '@angular/router';
export type Config = {
  multi?: boolean
};
import * as ipify from 'ipify';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

declare var Razorpay: any;

@Component({
  selector: 'app-intellectual-property-assignment-agreement',
  templateUrl: './intellectual-property-assignment-agreement.component.html',
  styleUrls: ['./intellectual-property-assignment-agreement.component.scss']
})
export class IntellectualPropertyAssignmentAgreementComponent implements OnInit {

  menus: any[] = [
    {
      name: 'What is the eligibility for applying to the undergraduate programs of University of Delhi?',
      iconClass: 'fa fa-code',
      active: true,
      submenu: [
        { answer: 'You should have passed class 12 (or its equivalent) or should be appearing for class 12 (or its equivalent) examination in 2022. There is NO minimum percentage that you need to have.', subanswers: [] },
      ]
    },
    {
      name: 'Do my class 12 marks have any weight in my admission to an undergraduate program in University of Delhi? ',
      iconClass: 'fa fa-mobile',
      active: false,
      submenu: [
        { answer: 'No. Your admission in University of Delhi is based ONLY on your performance in the CUET 2022. ', subanswers: [] },
      ]
    },
    {
      name: 'Is gap year a problem in taking admission in an undergraduate program of University of Delhi?',
      iconClass: 'fa fa-globe',
      active: false,
      submenu: [
        { answer: 'Not at all. Gap year does NOT put you at any disadvantage as far as your admission in an undergraduate program of University of Delhi is concerned. You do NOT even need to submit any certificate in this regard.', subanswers: [] },
      ]
    },
    {
      name: 'What are the age limits for taking admission in an undergraduate program of University of Delhi?',
      iconClass: 'fa fa-globe',
      active: false,
      submenu: [
        { answer: "There is NO such age limit (lower or upper).", subanswers: [] },
      ]
    },
    {
      name: 'I have NOT studied History at class 12 level. Can I apply for B.A. (Hons.) History in University of Delhi?',
      iconClass: 'fa fa-globe',
      active: false,
      submenu: [
        { answer: 'Yes, it will not be a problem at all. If you have studied science/commerce subjects at class 12 level, you may apply to any course in Arts. For taking admission in B.A. (Hons.) Economics, you must have studied Mathematics at class 12 level.', subanswers: [] },
      ]
    },
    {
      name: 'Do I need to apply to different colleges of University of Delhi for taking admission in an undergraduate program?',
      iconClass: 'fa fa-globe',
      active: false,
      submenu: [
        { answer: 'No. You just need to indicate programs of your choice in the CUET 2022 application.', subanswers: [] },
      ]
    },
    {
      name: 'Is there any disadvantage to me in the admission in an undergraduate program of University of Delhi if I switch from science (at class 12 level) to arts/commerce at undergraduate level?',
      iconClass: 'fa fa-globe',
      active: false,
      submenu: [
        { answer: 'Not at all.', subanswers: [] },
      ]
    },
    {
      name: 'Do I need to come to Delhi for the centralized counseling for undergraduate admissions in University of Delhi?',
      iconClass: 'fa fa-globe',
      active: false,
      submenu: [
        { answer: 'No. It will be e-counseling. You will have to come to Delhi/New Delhi to attend classes!', subanswers: [] },
      ]
    },
    {
      name: 'Is there any reservation in University of Delhi for seats in its undergraduate programs?',
      iconClass: 'fa fa-globe',
      active: false,
      submenu: [
        { answer: 'Yes, University of Delhi follows the rules made by the Government of India and it has reservations for', subanswers: [] },
        { answer: 'Scheduled Castes (SC): 15% ', subanswers: [] },
        { answer: 'Scheduled Tribe (ST): 7.5%', subanswers: [] },
        { answer: 'Other Backward Castes Non-Creamy (OBC-NC): 27% ', subanswers: [] },
        { answer: 'Economically Weaker Section (EWS): 10%.', subanswers: [] },
        { answer: 'Other than this the university has some colleges run by some minority ', subanswers: [] },
        { answer: '(Christian/Sikh) institutions (St. Stephen’s College, Jesus and Mary College, SGTB ', subanswers: [] },
        { answer: 'Khalsa College, Mata Sundari College, etc.) that have flat 50% reservation for the minority that runs the institution.', subanswers: [] },
      ]
    },
    {
      name: 'Is it mandatory to take CUET 2022 for taking admission in undergraduate programs of University of Delhi?',
      iconClass: 'fa fa-globe',
      active: false,
      submenu: [
        { answer: 'Yes. There are two exceptions to this: School of Open Learning (SOL) and Non-Collegiate Women Education Board (NCWEB). Admissions to the SOL and the NCWEB will be based on marks in class 12. If you are a foreigner (to India), then also the CUET is not mandatory for you.', subanswers: [] },
      ]
    },
    {
      name: 'Do I need to put the preference for colleges in University of Delhi while applying for the CUET 2022?',
      iconClass: 'fa fa-globe',
      active: false,
      submenu: [
        { answer: 'No, you CANNOT opt for colleges in the CUET application. You can only opt for the programs and the universities. You CANNOT give any preference for the universities either. Please bear in mind that the order, in which you put the programs/universities in the CUET application, does NOT matter at all.', subanswers: [] },
      ]
    },
    {
      name: 'Can I opt for a Domain-Specific Subject test in CUET 2022 if I did not have that particular subject in class 12 (for applying to an undergraduate program of University of Delhi)?',
      iconClass: 'fa fa-globe',
      active: false,
      submenu: [
        { answer: 'No. As far as University of Delhi is concerned, you can opt for ONLY those subjects in Section 2 (Domain-Specific Subject) of the CUET that you have/had in class 12. However, it obviously does not apply to the General Test (section 3 of the CUET) or the Language Tests (section 1 of the CUET).', subanswers: [] },
      ]
    },
    {
      name: 'I am weak at English; how difficult would it be for me to take admission in an undergraduate program of University of Delhi?',
      iconClass: 'fa fa-globe',
      active: false,
      submenu: [
        { answer: 'There are ONLY two undergraduate courses (out of a total of 74) offered by University of Delhi that expect you to take a Language Test in English: B.A. (Hons.) English and B.A. (Hons.) Journalism. If you are weak at English, please opt for a medium (for Domain-Specific Subject tests and General Test) other than English. You have as many as 12 choices (other than English) for the medium: Assamese, Bengali, Gujarati, Hindi, Kannada, Malayalam, Marathi, Odia, Punjabi, Tamil, Telugu and Urdu. Also, you may appear for a Language Test other than English and you have as many as 32 choices for it!', subanswers: [] },
      ]
    },
    {
      name: 'Is taking a Language Test (Section 1 of the CUET) compulsory for taking admission in an undergraduate program of University of Delhi?',
      iconClass: 'fa fa-globe',
      active: false,
      submenu: [
        { answer: 'Yes. There are courses for which your score in the Language Test is just qualifying (you need to score 30% i.e. 60 out of 200) and this will not be added to your total. There are some other courses for which your score in the Language Test will be added to the total.', subanswers: [] },
      ]
    },
    {
      name: 'Is taking the General Test (Section 3 of the CUET) compulsory for taking admission in an undergraduate program of University of Delhi?',
      iconClass: 'fa fa-globe',
      active: false,
      submenu: [
        { answer: 'There are ONLY 6 courses for which the General Test is compulsory:', subanswers: [] },
        { answer: 'A. 5-year Integrated Program in Journalism', subanswers: [] },
        { answer: 'B. B.A. (Hons.) Multimedia and Mass Communication', subanswers: [] },
        { answer: 'C. B.Tech. (Information Technology and Mathematical Innovation) ', subanswers: [] },
        { answer: 'D. Bachelor of Management Studies (BMS)', subanswers: [] },
        { answer: 'E. Bachelor of Business Administration (Financial Investment Analysis)', subanswers: [] },
        { answer: 'F. B.A (Hons.) Business Economics', subanswers: [] },
        { answer: 'There are courses for which the General Test is optional i.e. it is part of one of the many combinations of tests offered to you (with at least one combination without the General Test).', subanswers: [] },
      ]
    },
    {
      name: 'I have arts/commerce in class 12, am I eligible for B.Sc. (Hons.) Mathematics from University of Delhi?',
      iconClass: 'fa fa-globe',
      active: false,
      submenu: [
        { answer: 'Yes, provided Mathematics was one of your papers in class 12. In fact, there are many other courses in science in which you can take admission despite being from arts/commerce background provided mathematics was one of your ', subanswers: [] },
        { answer: 'papers in Class 12. Some of these courses are:', subanswers: [] },
        { answer: 'B.Sc. (Hons.) Computer Science', subanswers: [] },
        { answer: 'B.Sc. (Hons.) Statistics ', subanswers: [] },
        { answer: 'B.Sc. (Prog.) Mathematical Sciences.', subanswers: [] },
      ]
    },
    {
      name: 'I did not have Mathematics in class 12, can I apply for B.Com. (Hons.) at University of Delhi?',
      iconClass: 'fa fa-globe',
      active: false,
      submenu: [
        { answer: 'Yes, provided you had Accountancy in class 12. It is compulsory to have at least one of Mathematics and Accountancy in class 12 to be eligible for B.Com (Hons.) from University of Delhi. However, you are eligible for B.Com (without Hons.) even if you did not have any of Mathematics and Accountancy in class 12. There are as many as 44 colleges in University of Delhi that offer B.Com.', subanswers: [] },
      ]
    },
    {
      name: 'Does University of Delhi offer 5-year B.A. LL.B. or B.B.A. LL.B.?',
      iconClass: 'fa fa-globe',
      active: false,
      submenu: [
        { answer: 'No. University of Delhi offers a 3-year LL.B., but this course is only for graduates.', subanswers: [] },
      ]
    },
    {
      name: 'Does University of Delhi offer B. El. Ed. (Bachelor of Elementary Education)?',
      iconClass: 'fa fa-globe',
      active: false,
      submenu: [
        { answer: 'Yes, there are 8 colleges in University of Delhi that offer B. El. Ed. All these 8 colleges are ONLY for women. You are not eligible for this course if you are a boy!', subanswers: [] },
      ]
    },
    {
      name: 'Is B.A. (Hons.) Psychology available for boys in University of Delhi?',
      iconClass: 'fa fa-globe',
      active: false,
      submenu: [
        { answer: 'A. Aryabhatta College', subanswers: [] },
        { answer: 'B. Keshav Mahavidyalaya', subanswers: [] },
        { answer: 'C. Zakir Hussain Delhi College', subanswers: [] },
      ]
    },
    {
      name: 'Does University of Delhi offer courses in Journalism at undergraduate level?',
      iconClass: 'fa fa-globe',
      active: false,
      submenu: [
        { answer: 'Yes. These are the courses offered by the university on Journalism:', subanswers: [] },
        { answer: 'A. 5-year Integrated Program in Journalism', subanswers: [] },
        { answer: 'B. B.A. (Hons.) in Multimedia and Mass Communication', subanswers: [] },
        { answer: 'C. B.A. (Hons.) Journalism (this is for journalism in English)', subanswers: [] },
        { answer: 'D. B.A. (Hons.) Hindi Patrakarita (this is for journalism in Hindi)', subanswers: [] },
      ]
    },
  ];

  options: Config = { multi: false };
  config!: Config;

  documentDetailsObj:any;

  documentTitle:any;
  imgUrl:any;

  razorpay: any;

  userLocale: any;
  currency: any;

  latitude:any
  longitude:any;
  country:any
  constructor(public documentService: DocumentService,private http: HttpClient, public userService:UserregistationService,public router:Router,   public paymentServices: PaymentService, public dialog: MatDialog, public _appConfig: appconfig,) { }

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
            console.log(this.country )
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
    this.documentService.getDocumentDetails(this.documentTitle).subscribe(res=>{
      if(res.length > 0){
        this.documentDetailsObj = res[0];
        console.log( this.documentDetailsObj)
        this.getTotalAmount()
      }
    })
  }

  totalAmount:any = 0;
  ustotalAmount:any = 0
  docAmount:any = 0
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
      

        this.razorpay = {
          key: 'rzp_test_kiShCWkIktNxPI',
          amount: this.docAmount * 100, // The payment amount in paise or the smallest currency unit
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
      category:  this.documentDetailsObj.document_category,
      sub_category: this.documentDetailsObj.document_sub_category,
      document_or_startup:'Document'

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



this.tankU()


        //  setTimeout(() =>{
        //   location.reload()
        //  },2000)
       
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

  tankU(){
    setTimeout(() => {
      const dialogRef = this.dialog.open(ThankPopUPComponent, {
        panelClass: 'login-modal',
      //  data:res.patment_data[0].document_or_startup_sub_category
      });
      dialogRef.afterClosed().subscribe(res => {
       
      })
    }, 4000);
    
  }

  initiatePayment(orderId: any) {
    console.log(orderId)
    this.razorpay.order_id = orderId;
    let razPay: any = new Razorpay(this.razorpay)
    // razPay.order_id = orderId;
    razPay.open();
  }


}






@Component({
  selector: 'app-thank-pop-up',
  templateUrl: './thanks-pop-up.html',
  styleUrls: ['./intellectual-property-assignment-agreement.component.scss']
})
export class ThankPopUPComponent implements OnInit {

  document_name:any


  constructor(public dialogRef: MatDialogRef<ThankPopUPComponent>,
    public fb: FormBuilder, private http: HttpClient,

    @Inject(MAT_DIALOG_DATA) public data: any,
    // public toastr: ToastrService,
  ) {

  }

  ngOnInit(): void {
    console.log(this.data)
   this.data

   setTimeout(() => {
    location.reload()
  }, 3000);

  } 

  cloceDialog(){
    this.dialogRef.close()
  }
}