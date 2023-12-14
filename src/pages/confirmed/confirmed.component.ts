import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { appconfig } from 'src/providers/appconfig';
import { PortalService } from 'src/services/portal.service';
import { UserregistationService } from 'src/services/userregistation.service';

@Component({
  selector: 'app-confirmed',
  templateUrl: './confirmed.component.html',
  styleUrls: ['./confirmed.component.scss']
})
export class ConfirmedComponent implements OnInit {
  imgUrl: any
  id: any
  lawyerData: any
  userDetails: any
  user: any
  appTime: any
  appDate: any
  appointmentTokenId:any
  reating:any

  constructor(
    public portalService: PortalService,
    public userService: UserregistationService,
    public _appConfig: appconfig,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    let url = document.URL.split('/')[document.URL.split('/').length - 1]
    this.id = url
    this.imgUrl = this._appConfig.IMG_Url;
    this.getAppoinmet()

    window.onscroll = function () { myFunction() };

    let header: any = document.getElementById("myHeader");
    let sticky = header.offsetTop;

    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }

    
  }

  getAppoinmet() {
    this.userService.appointmetDetails(this.id).subscribe(res => {
      console.log(res)
      this.appTime = res[0]
      this.appDate = res[0]
      this.reating = res[0]
      this.lawyerData = res[0].timeslot.created_by
      this.user = res[0].client
     this.appointmentTokenId = res[0].token_numbers
     this.toastr.info(  "Appointment Id"+" "+" "+ this.appointmentTokenId, 'Info!');
    })
  }

  getDirections(){
    window.open('https://maps.google.com/?q='+this.lawyerData?.lattitude+','+this.lawyerData?.longitude)
  }

  mailtoJustLaw(){
    window.open('mailto:'+this.lawyerData.email, "_blank");
  }

}
