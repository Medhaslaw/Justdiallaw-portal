import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { appconfig, environment } from 'src/providers/appconfig';
import { LawyeregService } from 'src/services/lawyereg.service';
import { UserregistationService } from 'src/services/userregistation.service';
import { LawyerloginmodelComponent } from './lawyerloginmodel/lawyerloginmodel.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { BnNgIdleService } from 'bn-ng-idle';
import { ToastrService } from 'ngx-toastr';
import { getMessaging, getToken, onMessage } from "firebase/messaging";


declare var Pusher:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userDetails: any

  show!: boolean;
  show1: boolean = true;
  useravtar: any;

  justDialLawUserToken: any;

  user_Profile: any
  imgUrl: any

  documentList: any[] = [
    {
      document_id: '2', document_name: 'Startup Documents',
      subDocuments: [
        { id: '1', document_id: '2', document_name: 'Startup Documents', sub_document_name: 'Intellectual Property Assignment Agreement' },
        { id: '2', document_id: '2', document_name: 'Startup Documents', sub_document_name: 'Franchise Agreement' },
        { id: '3', document_id: '2', document_name: 'Startup Documents', sub_document_name: 'Co-founders Agreement' },
        { id: '4', document_id: '2', document_name: 'Startup Documents', sub_document_name: 'Licensing Agreement' },
        { id: '5', document_id: '2', document_name: 'Startup Documents', sub_document_name: 'Term Sheet Drafting' },
        { id: '6', document_id: '2', document_name: 'Startup Documents', sub_document_name: 'Software as a Service (saas) Agreement' },
        { id: '7', document_id: '2', document_name: 'Startup Documents', sub_document_name: 'Privacy Policy' },
        { id: '8', document_id: '2', document_name: 'Startup Documents', sub_document_name: 'Bussiness Partnership Agreement' },
        { id: '9', document_id: '2', document_name: 'Startup Documents', sub_document_name: 'Consultancy Agreement' },
        { id: '10', document_id: '2', document_name: 'Startup Documents', sub_document_name: 'Employment Agreement' },
        { id: '11', document_id: '2', document_name: 'Startup Documents', sub_document_name: 'Non Disclosure Agreement' },
        { id: '12', document_id: '2', document_name: 'Startup Documents', sub_document_name: 'Shareholder Subscription Agreement' },
        { id: '13', document_id: '2', document_name: 'Startup Documents', sub_document_name: 'Join Venture' },
        { id: '14', document_id: '2', document_name: 'Startup Documents', sub_document_name: 'Service Agreement' },

      ]
    },
    {
      document_id: '3', document_name: 'Agreeements & Contracts',
      subDocuments: [
        { id: '15', document_id: '3', document_name: 'Agreeements & Contracts', sub_document_name: 'Letter Of Intent' },
        { id: '16', document_id: '3', document_name: 'Agreeements & Contracts', sub_document_name: 'Freelancer Agreement' },
        { id: '17', document_id: '3', document_name: 'Agreeements & Contracts', sub_document_name: 'Loan Agreement' },

      ]
    },
    {
      document_id: '4', document_name: 'Property Documents',
      subDocuments: [
        { id: '18', document_id: '4', document_name: 'Property Documents', sub_document_name: 'Will' },
        { id: '19', document_id: '4', document_name: 'Property Documents', sub_document_name: 'Commercial Lease Agreement' },
        { id: '20', document_id: '4', document_name: 'Property Documents', sub_document_name: 'Gift Deed' },
        { id: '21', document_id: '4', document_name: 'Property Documents', sub_document_name: 'Sale Deed Drafting' },
        { id: '22', document_id: '4', document_name: 'Property Documents', sub_document_name: 'Relinquishment Deep' },
        { id: '23', document_id: '4', document_name: 'Property Documents', sub_document_name: 'Joint Development Agreement' },
        { id: '24', document_id: '4', document_name: 'Property Documents', sub_document_name: 'Power Of Attorney' },
      ]
    }
  ]

  startupList =[
    {
      document_id: '5', document_name: 'Company Formation',
      subDocuments: [
        {id:'1', document_id:'5',  document_name:'Company Formation', sub_document_name:'Partnership Firm'},
        {id:'2', document_id:'5',  document_name:'Company Formation', sub_document_name:'Limited Liability Partnership'},
        {id:'3',  document_id:'5', document_name:'Company Formation', sub_document_name:'One Person Company'},
        {id:'4', document_id:'5',  document_name:'Company Formation', sub_document_name:'Private Limited Company'},
     
      ]
    },
    {
      document_id: '6', document_name: 'Intellectual Property',
      subDocuments: [
        {id:'5',  document_id:'6', document_name:'Intellectual Property', sub_document_name:'Respond to Tm Objections'},
    {id:'6',  document_id:'6', document_name:'Intellectual Property', sub_document_name:'Patent'},
    {id:'7',  document_id:'6', document_name:'Intellectual Property', sub_document_name:'Copyright'},
    {id:'8',  document_id:'6', document_name:'Intellectual Property', sub_document_name:'Trademark'},
 
      ]
    },
    // {
    //   document_id: '7', document_name: 'Legal Consultation',
    //   subDocuments: [
    //     {id:'9',  document_id:'7', document_name:'Legal Consultation', sub_document_name:'Education Technology'},
    //     {id:'10',  document_id:'7', document_name:'Legal Consultation', sub_document_name:'Health Technology'},
    //     {id:'11',  document_id:'7', document_name:'Legal Consultation', sub_document_name:'Food Technology'},
    //     {id:'12',  document_id:'7', document_name:'Legal Consultation', sub_document_name:'Start-up Advice'},
     
    //   ]
    // },
   
 
   
   ]

  mouseOverObj: string = 'document';

  userId:any
  lawyerId:any

  message:any

  @Output() change = new EventEmitter<string>()

  constructor(public router: Router, public _appConfig: appconfig,
    public dialog: MatDialog,
    public userService: UserregistationService,
    public lawyerService: LawyeregService,
    private bnIdle: BnNgIdleService,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.imgUrl = this._appConfig.IMG_Url;
    if (localStorage.getItem('user-token')) {
      this.justDialLawUserToken = localStorage.getItem('user-token')
      this.getProfileDetails()
      this.getProfileData()
      // this.userLoginTimeOut()
      this.show = true
      this.show1 = false

      let data: any = localStorage.getItem('userData')
      this.userId = JSON.parse(data)[0].id;

      Pusher.logToConsole = true;
      let pusher = new Pusher('799ac5b30432874fb622', {
        cluster: 'ap2',
      });
  
     var channel =  pusher.subscribe('bid-user'+this.userId);
      channel.bind('bid-user',(data:any)=>{
        this.toastr.success('Advocate Send Meeting Notes!', 'Success!');
      } );


      var channel1 =  pusher.subscribe('online-appointments'+this.userId);
      channel1.bind('online-appointments',(data:any)=>{
        this.toastr.success('Advocate Send Online Appointments!', 'Success!');
      } );

      var channel2 =  pusher.subscribe('doc-share'+this.userId);
       channel2.bind('doc-share',(data:any)=>{
        this.toastr.success('Advocate Send Send Documents!', 'Success!');
      } );
    }
    this.getClinteProfileData()
    this.mouseOverObj = 'document';

    // this.requestPermission();
    // this.listen();


    window.onscroll = function () { myFunction() };

    let header:any = document.getElementById("myHeader");
    let sticky = header.offsetTop;

    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
}
   

  }

  openMenu() {
    const hamburger: any = document.querySelector('.hamburger');
    const siteNav: any = document.querySelector('.site-navigation');

    hamburger.classList.toggle('is-active');
    siteNav.classList.toggle('is-open');
  }


  // requestPermission() {
  //   const messaging = getMessaging();
  //   getToken(messaging, 
  //     { vapidKey: environment.firebase.vapidKey}).then(
  //       (currentToken) => {
  //         if (currentToken) {
  //           console.log("Hurraaa!!! we got the token.....");
  //           console.log(currentToken);
  //         } else {
  //           console.log('No registration token available. Request permission to generate one.');
  //         }
  //     }).catch((err) => {
  //        console.log('An error occurred while retrieving token. ', err);
  //    });
  // }

  // listen() {
  //   const messaging = getMessaging();
  //   onMessage(messaging, (payload) => {
  //     console.log('Message received. ', payload);
  //     this.message=payload;
  //   });
  // }

  isDropdownOpen = false;


  gotoDocuments(obj:any){
   
    this.router.navigate(['/documents/'+obj.document_name.toLowerCase().replaceAll(' ', '-') + '/'+ obj.sub_document_name.toLowerCase().replaceAll(' ', '-')])
    this.userService.subServiceDoc(obj.sub_document_name)
    
  }

  gotoStartups(obj:any){
    this.router.navigate(['/startup/'+obj.document_name.toLowerCase().replaceAll(' ', '-') + '/'+ obj.sub_document_name.toLowerCase().replaceAll(' ', '-')])
    this.userService.subServiceDoc(obj.sub_document_name)
  
  

  }



  getProfileDetails() {
    this.userService.getProfileDetails().subscribe(res => {
      if (res.length > 0) {

        this.userDetails = res[0];
        let userprofile = this.userDetails.profile_pic_url
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

  getClinteProfileData() {
    this.userService.clintData.subscribe(res => {
      if (res) {

        this.justDialLawUserToken = localStorage.getItem('user-token')
        this.getProfileDetails()

      }
    })
  }
  logOut() {
    this.show = false
    this.show1 = true
    localStorage.removeItem('lawyer-token')
    localStorage.removeItem('user-token')
    localStorage.removeItem('userData')
    localStorage.removeItem('jlLawyerData')
    this.router.navigate(['/home']);
    this.user_Profile = '';
    this.userDetails = '';
    this.ngOnInit()

  }

  Dashboard() {
    if (localStorage.getItem('user-token')) {
      this.router.navigate(['/my-jdl'])
    } else if (localStorage.getItem('lawyer-token')) {
      this.router.navigate(['/lawyer-jdl'])
    }
  }

  openDialog() {
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
  openUserDialog() {
    const dialogRef = this.dialog.open(UserloginComponent, {
      panelClass: 'login-modal',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        if (localStorage.getItem('user-token')) {
          this.getProfileDetails()
          this.getProfileData()
          this.getClinteProfileData()
       


          let data: any = localStorage.getItem('userData')
          this.userId = JSON.parse(data)[0].id;

          Pusher.logToConsole = true;
         let  pusher = new Pusher('799ac5b30432874fb622', {
             cluster: 'ap2',
           });
       
           var channel =  pusher.subscribe('bid-user'+this.userId);
         
           channel.bind('bid-user',(data:any)=>{
            
             this.toastr.success('Advocate Send Meeting Notes!', 'Success!');
     
           } );

           var channel1 =  pusher.subscribe('online-appointments'+this.userId);
           channel1.bind('online-appointments',(data:any)=>{
             this.toastr.success('Advocate Send Online Appointments!', 'Success!');
           } );
  
           var channel2 =  pusher.subscribe('doc-share'+this.userId);
            channel2.bind('doc-share',(data:any)=>{
             this.toastr.success('Advocate Send Send Documents!', 'Success!');
           } );


        

        }
      }

    })

  }
  profile() {
    if (localStorage.getItem('lawyer-token')) {
      this.router.navigate(['/lawyer-jdl/profile'])
    }
  }


  userLoginTimeOut() {

    this.bnIdle.startWatching(120).subscribe((res) => {
      if (res) {
        console.log("User session expired");
        localStorage.removeItem('user-token')
        localStorage.removeItem('userData')
        this.router.navigate(['/home']);
        this.bnIdle.stopTimer()
        this.user_Profile = '';
        this.userDetails = '';
        this.ngOnInit()
      }

    })
  }

  changeMenu(val: any) {
    this.mouseOverObj = val
  
  }

}
