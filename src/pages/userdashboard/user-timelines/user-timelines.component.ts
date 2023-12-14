import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ToastrService } from 'ngx-toastr';
import { Inject } from '@angular/core';
import { UserregistationService } from 'src/services/userregistation.service';
import { MatTableDataSource } from '@angular/material/table';
import { appconfig } from 'src/providers/appconfig';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface PeriodicElement1 {
  date: string;
  name: string;
  status: string;
  meeting_detalis:string
}


@Component({
  selector: 'app-user-timelines',
  templateUrl: './user-timelines.component.html',
  styleUrls: ['./user-timelines.component.scss']
})
export class UserTimelinesComponent implements OnInit {

  selectedCase: any;
  fixed!: boolean;
  @ViewChild('stickyMenu')
  menuElement!: ElementRef;

  index:any = 0

  accCaseList: any[] = []
  elementPosition: any;
  navbarfixed: boolean = false;
  userId: any

  app_id:any

  allMeeting:any[]=[]

  displayedColumns: string[] = ['date', 'name', 'status','meeting_detalis'];
  dataSource = new MatTableDataSource<PeriodicElement1>;

  imgUrl:any;



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( public dialog: MatDialog,
    public userService: UserregistationService,
    public _appConfig: appconfig,
    public router: Router,
  
    ) { }

  ngOnInit(): void {
    let data: any = localStorage.getItem('userData')
    this.userId = JSON.parse(data)[0].id;
    let url:any = document.URL.split('/')[document.URL.split('/').length - 1]
    this.app_id = url


this.getAppointmentData()
    // this.getCases()

    this.imgUrl = this._appConfig.IMG_Url;

    // this.getAllTimeLines()

    this.getAllLawyerFiles()
    this.getAllNotes()
  }

  @HostListener('window:scroll', ['$event']) onscroll() {

    if (window.scrollY > 50) {
      this.navbarfixed = true;
    } else {
      this.navbarfixed = false
    }
  }
  
  viewCase(caseObj: any) {
    this.selectedCase = caseObj;
    this.app_id = caseObj.id
    this.getAllTimeLines()

  }

  getCases() {
    this.userService.acceptsCase('accept',this.userId).subscribe((res:any) =>{
      if (res.length > 0) {
        this.accCaseList = res;
        this.selectedCase = this.accCaseList[0];
        this.app_id = this.accCaseList[0].id
       
      }
    })
  }

  appSelectedData:any
  getAllTimeLines(){
this.userService.appomentsTimelines(this.app_id).subscribe((res:any) =>{
  this.appSelectedData = res.data
})
  }

  tabVal:any = 'case-details';
  tabChange(val:any){
    this.tabVal = val;
    if(val == 'online'){
      this.getAllMeeting()
    }
  }



  uploadAllFiles:any
  getAllLawyerFiles(){
    this.userService.allFilesGet(this.app_id).subscribe((res:any) =>{
      if(res){
        this.uploadAllFiles = res
      
      }
    })
  }
  
  
  
deleteFile(file:any){

  const dialogRef = this.dialog.open(deleteBlogsComponent, {
    panelClass: 'link-modal',
    data:file.id,
    disableClose: true,
  });

  dialogRef.afterClosed().subscribe(result => {
    if(result){
      this.userService.deleteFile(file.id).subscribe((res:any) =>{
        if (res){
          this.getAllLawyerFiles()
        }
      })
    }
   
  });

}

deleteNot(notes:any){
  const dialogRef = this.dialog.open(deleteBlogsComponent, {
    panelClass: 'link-modal',
    data: {
      dataKey:this.app_id,
      meeting_id:notes
    },
    disableClose: true,
  });

  dialogRef.afterClosed().subscribe(result => {
    if(result){
      this.userService.notesDelete(notes).subscribe((res:any) =>{
        if (res){
          this.getAllNotes()
        }
      })
    }
   
  });
}

  allNotes:any
  getAllNotes(){
    this.userService.allMeetingNotes(this.app_id).subscribe((res:any) =>{
    
      if(res){
        this.allNotes = res
      }
    })
  }
  
  editnotes(notes:any){

    const dialogRef = this.dialog.open(AddCommentDialog, {
      panelClass: 'link-modal_1',
      width:'300px',
      data: {
        dataKey:this.app_id,
        meeting_id:notes
      },
      disableClose: true,
    });
  
    dialogRef.afterClosed().subscribe(result => {
     this.getAllNotes()
    });


    // this.userService.notesSingleGet().subscribe((res:any) => {

    // })
  }

  getAllMeeting(){
    this.userService.allOnlineAppoinments(this.app_id).subscribe((res:any) =>{
   
      if(res){
        this.allMeeting = res
        this.dataSource = new MatTableDataSource(this.allMeeting)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

     
      }
    })
  }
  
  
  getTooltip(elemen:any): any {
    return elemen
  }

  
  downloadfile(fileUrl:any){
    return window.location.href = `${fileUrl}`;
  }
  
  viewFile(obj:any){
    // userdashboard/user-timelines/23
    this.router.navigate(['/my-jdl/user-timelines/'+ this.app_id+'/view-file/'+obj.id])
  }


  caseDetails:any
  getAppointmentData(){
    this.userService.appointmentData(this.app_id).subscribe((res:any) =>{
      if(res){
        this.caseDetails = res[0]
      
      }
    })
  }


caseClosedBtnShow:boolean = true

onChange(event: MatTabChangeEvent){

}


addLink() {

  const dialogRef = this.dialog.open(AddLinkDialog, {
    panelClass: 'link-modal',
    data: {
      dataKey:this.app_id
    },
    disableClose: true,
  });

  dialogRef.afterClosed().subscribe(result => {
   
  });

}

addComment() {

  const dialogRef = this.dialog.open(AddCommentDialog, {
    panelClass: 'link-modal_1',
    width:'300px',
    data: {
      dataKey:this.app_id
    },
    disableClose: true,
  });

  dialogRef.afterClosed().subscribe(result => {
   this.getAllNotes()
  });

}

addPaymentLink(){
  const dialogRef = this.dialog.open(PaymentLinktDialog, {
    panelClass: 'link-modal',
    data: {
      dataKey:this.app_id
    },
    disableClose: true,
  });

  dialogRef.afterClosed().subscribe(result => {
   
  });

}

addFile(){

  const dialogRef = this.dialog.open(addFileDialog, {
    panelClass: 'link-modal_1',
    width:'300px',
    data: {
      dataKey:this.app_id
    },
    disableClose: true,
  });

  dialogRef.afterClosed().subscribe(result => {
    this. getAllLawyerFiles()
    
  });

}


}


@Component({
  selector: 'app-delete-blogs',
  templateUrl: './delete.html',
  styleUrls: ['./user-timelines.component.scss']
})
export class deleteBlogsComponent implements OnInit {

  constructor(public diagolref: MatDialogRef<deleteBlogsComponent>,public fb:FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserregistationService,
    public router: Router,
    public _appConfig: appconfig, ) {
   // this.fromPage = data.pageValue;
  }

  ngOnInit(): void {
   
  }

  onNoClick(): void {
    this.diagolref.close();
    
  }


  deleteFile(){
    this.diagolref.close('delete')
   
  }

}


@Component({
  selector: 'app-add-link',
  templateUrl: './add-link.html',
  styleUrls: ['./user-timelines.component.scss']
})

export class AddLinkDialog {

  meetingLinkInput: boolean = true
  selected :any = 'online'

  meetingLinsFrom!: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddLinkDialog>,
    public fb: FormBuilder,
   
    @Inject(MAT_DIALOG_DATA) public data: any,
    public toastr: ToastrService,
    ){
  
  }

  ngOnInit(): void {
   this.meetingLinsFrom = this.fb.group({
    meet_link:['',[ Validators.required]],
    meet_date:['',[ Validators.required]],
    meet_time:['',[ Validators.required]],
    advocate_appointment: this.data.dataKey.id
   })
   console.log(this.data)
  }



meetingType(ev:any){
 if(ev.value == 'online'){
    this.meetingLinkInput = true
 } else if(ev.value == 'offline'){
  this.meetingLinkInput = false
 }
}

sendMeetings(){
  
 
}

}


@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.html',
  styleUrls: ['./user-timelines.component.scss']
})

export class AddCommentDialog {

  commentsFrom!:FormGroup

  constructor(public dialogRef: MatDialogRef<AddCommentDialog>,
    public fb: FormBuilder,
   public userService: UserregistationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public toastr: ToastrService,
    ){

  }

  ngOnInit(): void {
    this.commentsFrom = this.fb.group({
      comment:['',[ Validators.required]],
      subject:['',[ Validators.required]],
      advocate_appointment: this.data.dataKey
    })
    this.getnot()
   }

   cloceDialog(){
    this.dialogRef.close()
  }
   addComment(){
    if(this.data.meeting_id){
      this.userService.notesUpdate(this.data.meeting_id,this.commentsFrom.value).subscribe((res:any) => {
        if(res){
          console.log(res)
        this.toastr.success('Meeting Notes Updated Successfully', 'Success!')
        this.dialogRef.close()
        }
      })
    }else if(this.commentsFrom.valid){
      this.userService.meetingNotes(this.commentsFrom.value).subscribe((res:any) =>{
        if(res){
          this.dialogRef.close(res)
          this.toastr.success('Comment Submint Successfully!', 'Success!')
        }
      })
    } 
 
   }
   getnot(){
    this.userService.notesSingleGet(this.data.meeting_id).subscribe((res:any) => {
      console.log(res)
      this.commentsFrom = this.fb.group({
        comment: [res.comment, [Validators.required,]],
        subject: [res.subject, [Validators.required, ]],
        }) 
    })
   }


}

@Component({
  selector: 'app-payment-link',
  templateUrl: './payment-link.html',
  styleUrls: ['./user-timelines.component.scss']
})

export class PaymentLinktDialog {

  paymentsLinsFrom!: FormGroup;

  constructor(public dialogRef: MatDialogRef<PaymentLinktDialog>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public toastr: ToastrService,
    ){

  }

  ngOnInit(): void {
    this.paymentsLinsFrom = this.fb.group({
      payment_link:['',[ Validators.required]],
      amount:['',[ Validators.required]],
      advocate_appointment: this.data.dataKey.id
    })
   }

   sendPaymentLinks(){
   
   }


   addFile(){

   }

}


@Component({
  selector: 'app-add-file',
  templateUrl: './add-files.html',
  styleUrls: ['./user-timelines.component.scss']
})

export class addFileDialog {

  addFileFrom!: FormGroup;
  files:any
  fileName:any
  fileType:any
  fileSize:any

  constructor(public dialogRef: MatDialogRef<addFileDialog>,
    public fb: FormBuilder,
    public userService: UserregistationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public toastr: ToastrService,
    ){

  }

  ngOnInit(): void {
    this.addFileFrom = this.fb.group({
      client_files:['',[ Validators.required]],
      advocate_appointment:'',
      file_type:'',
      file_size:'',
      file_name:'',
      client_file_name:['',[Validators.required]]
    })
   }

   cloceDialog(){
    this.dialogRef.close()
  }

   addFile(){

    let formData = new FormData()

    if(this.files){
      formData.append('client_files', this.files)
      formData.append('advocate_appointment', this.data.dataKey)
      formData.append('file_type',  this.fileType)
      formData.append('file_size', this.fileSize)
      formData.append('file_name', this.fileName)
      formData.append('client_file_name', this.addFileFrom.value.client_file_name)
    }

    this.userService.userAddFile(formData).subscribe((res:any) =>{
      if(res){

        this.toastr.success(' File Upload Successfully!', 'Success!')

        this.dialogRef.close(res)
      }
    })

   }

   onFileChanged(event: any){
   this.files = event.target.files[0];
   this.fileName = event.target.files[0].name;
   this.fileType =  event.target.files[0].type
   this.fileSize =  event.target.files[0].size
  }

}