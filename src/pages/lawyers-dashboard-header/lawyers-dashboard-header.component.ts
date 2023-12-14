import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { appconfig } from 'src/providers/appconfig';
import { LawyeregService } from 'src/services/lawyereg.service';
import { UserregistationService } from 'src/services/userregistation.service';
import { BnNgIdleService } from 'bn-ng-idle';
import { ToastrService } from 'ngx-toastr';

declare var Pusher:any;

@Component({
  selector: 'app-lawyers-dashboard-header',
  templateUrl: './lawyers-dashboard-header.component.html',
  styleUrls: ['./lawyers-dashboard-header.component.scss']
})
export class LawyersDashboardHeaderComponent implements OnInit {
  userDetails: any;
  useravtar: any;

  lawyerId:any
  user_Profile:any

  imgUrl:any

  constructor(public router: Router,public _appConfig : appconfig,
    public userService: UserregistationService, public lawyerService: LawyeregService,
    private lawyerbnIdle: BnNgIdleService,
    public toastr: ToastrService,
    ) { }

  getProfileData(){
    this.userService.lawyerData.subscribe(res=>{
      if(res){
        this.lawyerService.getProfileDetails().subscribe(res=>{
          if(res.length > 0){
            this.userDetails=res[0];
            let  userprofile=   this.userDetails.profile_pic
            this.user_Profile = userprofile
          }
        })
      }
    })
        }
    
      ngOnInit(): void {
        this.imgUrl = this._appConfig.IMG_Url;
     if(localStorage.getItem('lawyer-token')){
          this.lawyerService.getProfileDetails().subscribe(res=>{
            if(res.length > 0){
              this.userDetails=res[0];
              let  userprofile=   this.userDetails.profile_pic
              this.user_Profile = userprofile
            }
          })


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
             this.toastr.success('Client Send Send Documents!', 'Success!');
           } );
  



        } 
    
       this.getProfileData()
     
      //  this.lawyerbnIdle.startWatching(120).subscribe((res) => {
      //   if(res) {
      //     console.log("Lawyer session expired");
      //     localStorage.removeItem('lawyer-token')
      //     localStorage.removeItem('jlLawyerData')
      //     this.router.navigate(['/home']);
      //     this.lawyerbnIdle.stopTimer()
      //   }
      // })

      }


  logOut(){
    localStorage.removeItem('lawyer-token')
    localStorage.removeItem('userData')
    this.router.navigate(['/home']);
    localStorage.removeItem('user-token')
    localStorage.removeItem('jlLawyerData')
    localStorage.removeItem('userData')
    location.reload()
  }
  profile(){
    if(localStorage.getItem('lawyer-token')){
      this.router.navigate(['/lawyer-jdl/profile'])
    }
  }

  home(){
 
    this.router.navigate(['/home'])
}

}
