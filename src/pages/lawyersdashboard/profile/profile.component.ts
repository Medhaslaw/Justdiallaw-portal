import { Component, OnInit } from '@angular/core';
import { appconfig } from 'src/providers/appconfig';
import { LawyeregService } from 'src/services/lawyereg.service';
import { UserregistationService } from 'src/services/userregistation.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userDetails:any

  isSlideChecked = false;
  isSlideChecked1 = false;
  buttonName!: string;
  show1!: boolean;

  profileBank:any

  profilePercent:any = 0;

  imgUrl:any;
  constructor(public lawyerService: LawyeregService, public _appConfig: appconfig, 
    public userService: UserregistationService) { }

  ngOnInit(): void {
    this.imgUrl = this._appConfig.IMG_Url;
        this.getBarCouncil()
        this.getProfileDetails()
   this.getProfileData()
this.getProfileCharges()
this.getBankDetials()
  }

  getProfileDetails(){
this.lawyerService.getProfileDetails().subscribe(res=>{
  if(res.length > 0){
    this.userDetails=res[0]
    // this.profilePercent = this.profilePercent + 25
    console.log(this.userDetails)
    this.show = this.userDetails?.mobile_accept
    this.show1 = this.userDetails?.email_accept

    this.isSlideChecked = this.userDetails?.mobile_accept
    this.isSlideChecked1 = this.userDetails?.email_accept
  }
})
  }
  barCouncilInfo:any;
  getBarCouncil(){
    this.getProfileInfo()
    this.lawyerService.getBarCouncilInfo().subscribe((res:any)=>{
      if(res[0].state_bar_council){
        this.barCouncilInfo = res[0];
        this.profilePercent = this.profilePercent + 25
      }
    })
  }

  profileInfo:any;
  getProfileInfo(){
    this.lawyerService.getProfileInfo().subscribe((res:any)=>{
      if(res.practicing_since){
        this.profileInfo = res;
        this.profilePercent = this.profilePercent + 25
      }
    })
  }
  profileCharges:any
  getProfileCharges(){
    this.lawyerService.lawyerCharges().subscribe((res:any) =>{
      if(res.phone_consultation_fees > 0        ){
        this.profileCharges = res
        this.profilePercent = this.profilePercent + 25
       
      }
    })
  }

  getBankDetials(){
    this.lawyerService.getBankDetials().subscribe((res:any) =>{
      if(res[0].account_holder_name){
this.profileBank = res
this.profilePercent = this.profilePercent + 25
      }
    })
  }

  getProfileData(){
    this.userService.lawyerData.subscribe(res=>{
      if(res){
        this.getProfileDetails()
      }
    })
  }

  show!:boolean

  toggle() {
    this.show = !this.show;
    if(this.show)  {
      this.buttonName = "Hide";
      let reqData = {
        mobile_accept:true
      }
      this.lawyerService.lawyeravailable(reqData).subscribe((res:any) =>{
        if(res){
          console.log(res)
        }
      })
    }
    else{
      this.buttonName = "Show";
      let reqData = {
        mobile_accept:false
      }
      this.lawyerService.lawyeravailable(reqData).subscribe((res:any) =>{
        if(res){
          console.log(res)
        }
      })
    }
     
  }
  
  toggle1(){
    this.show1 = !this.show1;
    if(this.show1)  {
      this.buttonName = "Hide";
      let reqData = {
        email_accept:true
      }
      this.lawyerService.lawyeravailable(reqData).subscribe((res:any) =>{
        if(res){
          console.log(res)
        }
      })
    } else{
      this.buttonName = "Show";
      let reqData = {
        email_accept:false
      }
      this.lawyerService.lawyeravailable(reqData).subscribe((res:any) =>{
        if(res){
          console.log(res)
        }
      })
    }
  }

}
