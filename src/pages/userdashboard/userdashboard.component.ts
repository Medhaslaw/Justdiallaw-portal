import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { appconfig } from 'src/providers/appconfig';
import { LawyeregService } from 'src/services/lawyereg.service';
import { UserregistationService } from 'src/services/userregistation.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.scss']
})
export class UserdashboardComponent implements OnInit {
  userDetails: any;
  profileDetails: any
  profileImage:any
  user_Profile: any
  loading: boolean = false;
  files!: any;
  imgUrl: any;
  uploadImg!: FormGroup
  eve:any
  fileName: any;

  isOk!: boolean;

  constructor(public _appConfig: appconfig,
    public userService: UserregistationService,
    public fb: FormBuilder,
    public lawyerService: LawyeregService,
    public snackBar: MatSnackBar,
    private toastr: ToastrService,
    public router: Router,
    public dialog: MatDialog,
  ) { 
    this.isOk = sessionStorage.getItem('ok') === 'true';
  }

  ngOnInit(): void {



    if(localStorage.getItem('user-token')){
      this.imgUrl = this._appConfig.IMG_Url;
      this.getProfileDetails()
      this. getProfileData()
    } else {
      this.router.navigate(['/home']);
    }


//     setTimeout(() => {
// if( this.user_Profile.approved_by_admin === false){
//   if(this.isOk == false){
//     const dialogRef = this.dialog.open(userApprovePopComponent, {
//       panelClass: 'login-modal',
//       autoFocus: false,
//       data:this.user_Profile
//     });
//     dialogRef.afterClosed().subscribe(res => {

//       if (res) {
        
//       }

//     })
//   }
//   }
// }, 2000);

  }




  getProfileDetails(){
    this.userService.getProfileDetails().subscribe(res=>{
      if(res.length > 0){
        this.user_Profile=res[0]
        console.log( this.user_Profile)
        
      }
    })
      }

      getProfileData(){
        this.userService.userData.subscribe(res=>{
          if(res){
            this.getProfileDetails()
          }
        })
      }

  onFileChanged(event: any) {
    console.log(event)
    this.profileImage = event.target.files[0];
    let formData = new FormData()
    formData.append('profile_pic', this.profileImage)
    this.userService.userProfileUpdate(formData).subscribe(res=>{
      if(res.id){
        this.toastr.success('Profile Image Updated Successfully!', 'Success!');
        this.userService.userProfileData('userData')
      }
    })
  }



  logOut(){
    localStorage.removeItem('user-token')
    localStorage.removeItem('userData')
    this.router.navigate(['/home']);
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


@Component({
  selector: 'app-user-approve-dialog',
  templateUrl: './user-approve-pop.html',
  styleUrls: ['./userdashboard.component.scss']
})
export class userApprovePopComponent implements OnInit {

  isOk:boolean;

  constructor(  public dialogRef: MatDialogRef<userApprovePopComponent>,  @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.isOk = sessionStorage.getItem('ok') === 'true';
   }

  ngOnInit(): void {
    console.log(this.data)
  }


  cloceDialog(){
    this.dialogRef.close()
  }

  acceptTerms(): void {
    sessionStorage.setItem('ok', 'true');
    this.closePopup();
    this.dialogRef.close()
  }

  closePopup(): void {
    this.dialogRef.close()
  }

}

@Component({
  selector: 'app-user-img-dialog',
  templateUrl: './user-img-pop.html',
  styleUrls: ['./userdashboard.component.scss']
})
export class userImgPopComponent implements OnInit {

  
  constructor(  public dialogRef: MatDialogRef<userApprovePopComponent>,  @Inject(MAT_DIALOG_DATA) public data: any,) {
    
   }

  ngOnInit(): void {
    console.log(this.data)
  }


  cloceDialog(){
    this.dialogRef.close()
  }



  closePopup(): void {
    this.dialogRef.close()
  }

}