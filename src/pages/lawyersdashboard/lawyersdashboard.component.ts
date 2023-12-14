import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { appconfig } from 'src/providers/appconfig';
import { LawyeregService } from 'src/services/lawyereg.service';
import { UserregistationService } from 'src/services/userregistation.service';
import { userImgPopComponent } from '../userdashboard/userdashboard.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-lawyersdashboard',
  templateUrl: './lawyersdashboard.component.html',
  styleUrls: ['./lawyersdashboard.component.scss']
})
export class LawyersdashboardComponent implements OnInit {

  userDetails: any
  disabled = false;
  profileImage:any;
  user_Profile: any
  imgUrl:any

  

  constructor(public _appConfig: appconfig, public lawyerService: LawyeregService,
    public snackBar: MatSnackBar, public userService: UserregistationService,
    private toastr: ToastrService, public router: Router,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    if(localStorage.getItem('lawyer-token')){
      this.imgUrl = this._appConfig.IMG_Url;
      this.getProfileDetails()
      this.getProfileData()
    }   else {
      this.router.navigate(['/home']);
    } 
    
  }

  getProfileDetails(){
    this.lawyerService.getProfileDetails().subscribe(res=>{
      if(res.length > 0){
        this.userDetails=res[0]
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

  onFileChanged(event: any){
    this.profileImage = event.target.files[0];
    let formData = new FormData()
    formData.append('profile_pic', this.profileImage)
    this.lawyerService.profileImg(formData).subscribe(res=>{
      if(res.id){
        this.toastr.success('Profile Image Updated Successfully!', 'Success!');
        this.userService.saveProfileData('data')
      }
    })
  } 

  openMenu() {
    const open: any = document.querySelector('.open');
    const navheader: any = document.querySelector('.hednav');

    open.classList.toggle('menu-active');
    navheader.classList.toggle('is-open');
  }

  viewTab(){
    const open: any = document.querySelector('.open');
    const navheader: any = document.querySelector('.hednav');

    open.classList.toggle('menu-active');
    navheader.classList.toggle('is-open');
  }
  
  openDialog(user_data:any){
    
    const dialogRef = this.dialog.open(userImgPopComponent, {
      panelClass: 'login-modal',
      autoFocus: false,
      data:user_data
    });
    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        
      }

    })
  }

}
