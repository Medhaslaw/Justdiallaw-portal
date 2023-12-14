import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LawyeregService } from 'src/services/lawyereg.service';
import { Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { appconfig } from 'src/providers/appconfig';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';

export interface PeriodicElement1 {
  date: string;
  name: string;
  status: string;
  // action: string;
  meeting_detalis:string
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  selectedCase: any;
  fixed!: boolean;
  @ViewChild('stickyMenu')
  menuElement!: ElementRef;

  index:any = 0

  accCaseList: any[] = []
  elementPosition: any;
  navbarfixed: boolean = false;
  lawyerId: any

  app_id:any

  displayedColumns: string[] = ['id', 'date', 'name', 'meeting_detalis'];
  dataSource = new MatTableDataSource<PeriodicElement1>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  imgUrl:any;

  constructor(public lawyerService: LawyeregService,
    public dialog: MatDialog,
    public _appConfig: appconfig,
    public router:Router,
    public toaster: ToastrService
    ) { }

  ngOnInit(): void {
    let data: any = localStorage.getItem('jlLawyerData')
    this.lawyerId = JSON.parse(data)[0].id;
    let url:any = document.URL.split('/')[document.URL.split('/').length - 1]
    this.app_id = url
    this.imgUrl = this._appConfig.IMG_Url;

    this.getAppointmentData()

    this.app_id = url;
    this.getCases()
    this.getAllTimeLines()
    this.getAllLawyerFiles()
    this.getAllNotes()
    // this.getAllMeeting()
  }
  @HostListener('window:scroll', ['$event']) onscroll() {

    if (window.scrollY > 50) {
      this.navbarfixed = true;
    } else {
      this.navbarfixed = false
    }
  }

  getClass(fileObj:any){
    let fileType:any = 'bi bi-sticky-fill';
    if(fileObj.file_type === 'application/pdf'){
      fileType = 'bi bi-file-earmark-pdf-fill';
    }else if(fileObj.file_type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
      fileType = 'bi bi-file-earmark-word-fill';
    }else if(fileObj.file_type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
      fileType = 'bi bi-file-excel-fill';
    }else if(fileObj.file_type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'){
      fileType = 'bi bi-file-earmark-ppt-fill';
    }else if(fileObj.file_type === 'text/plain'){
      fileType = 'bi bi-sticky-fill';
    }
    return fileType;
  }

  viewCase(caseObj: any) {
    this.selectedCase = caseObj;
    this.app_id = caseObj.id
    this.getAllTimeLines()
  }

  getCases() {
    this.lawyerService.acceptOrRejectRcords('accept', this.lawyerId).subscribe((res: any) => {
      if (res.length > 0) {
        this.accCaseList = res;
        this.selectedCase = this.accCaseList.filter( (x:any) => x.id == parseInt(this.app_id))[0]
     
      }
    })
  }

  tabVal:any = 'case-details';
  tabChange(val:any){
    this.tabVal = val;
    if(val == 'online'){
      this.getAllMeeting()
    }
  }

  editAdvNotes(notes:any){
    const dialogRef = this.dialog.open(AddCommentDialog, {
      panelClass: ['link-modal', 'small-dialog'],
      data: {
        dataKey:this.app_id,
        meeting_id: notes
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
    this.getAllNotes()
    });
  }
  deleteAdvNotes(notes:any){
    const dialogRef = this.dialog.open(deleteBlogsComponent, {
      panelClass: ['link-modal', 'small-dialog'],
      data: {
        dataKey:this.app_id,
        meeting_id: notes
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.lawyerService.deleteNotes(notes).subscribe((res:any) => {
          if(res){
            this.getAllNotes()
            this.toaster.success('Your meeting notes deleted successfully', 'Successfully!')
          }
        })
      }
     
    });

  }


  appSelectedData:any

getAllTimeLines(){
  this.lawyerService.accpectAllCase(this.app_id).subscribe((res:any) =>{
    if(res){
      this.appSelectedData = res.data
    }
  })
}



uploadAllFiles:any
getAllLawyerFiles(){
  this.lawyerService.lawyerAllFiles(this.app_id).subscribe((res:any) =>{
    if(res){
      this.uploadAllFiles = res
    
    }
  })
}

allNotes:any
getAllNotes(){
  this.lawyerService.LawyerAllNotes(this.app_id).subscribe((res:any) =>{
    
    if(res){
      this.allNotes = res
    }
  })
}

allMeeting:any[] =[]
getAllMeeting(){
  this.lawyerService.lawyerAllMeeting(this.app_id).subscribe((res:any) =>{
    if(res){
      this.allMeeting = res
      this.dataSource = new MatTableDataSource(this.allMeeting)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  })
}



downloadfile(fileUrl:any){
  return window.location.href = `${fileUrl}`;
}

viewFile(obj:any){
  
  this.router.navigate(['/my-jdl/user-timelines/'+ this.app_id+'/view-file/'+obj.id])
  // window.open(this.imgUrl+obj);    
}

deleteFile(file:any){


  const dialogRef = this.dialog.open(deleteBlogsComponent, {
    panelClass: 'link-modal',
    data:file.id,
    disableClose: true,
  });

  dialogRef.afterClosed().subscribe(result => {
    if(result){
      this.lawyerService.deleteFile(file.id).subscribe((res:any) =>{
        if (res){
          this.getAllLawyerFiles()
          this.toaster.success('Your File deleted successfully', 'Successfully!')
        }
      })
    }
 
  });



}



getTooltip(elemen:any): any {
  return elemen
}

caseClose(selectedCase:any){
  // let reqData ={
  //   accepts_or_rejects:'closed',
  //   appointment_id: this.app_id
  // }

  // this.lawyerService.appoibtmentStatus(reqData).subscribe((res:any) =>{
  //   if(res){
  //   this.router.navigate(['/lawyer-jdl/cases'])
  //   }
  // })
  const dialogRef = this.dialog.open(ClosedCasesComponent, {
    panelClass: ['link-modal', 'small-dialog'],
    data: {
      dataKey:this.app_id
     
    },
    disableClose: true,
  });

  dialogRef.afterClosed().subscribe(result => {

  });

}

caseDetails:any
getAppointmentData(){
  this.lawyerService.appointmentData(this.app_id).subscribe((res:any) =>{
    if(res){
      this.caseDetails = res[0]
      
    }
  })
}

caseClosedBtnShow:boolean = true

onChange(event: MatTabChangeEvent){
  const tab = event.tab.textLabel;
 if(tab === 'Accept Cases'){
  this.lawyerService.acceptOrRejectRcords('accept', this.lawyerId).subscribe((res: any) => {
    if (res.length > 0) {
      this.accCaseList = res;
      this.selectedCase = this.accCaseList[0];
      this.app_id = this.accCaseList[0].id
      this.getAllTimeLines()
    this.caseClosedBtnShow = true
    }
  })
 } else if(tab === 'Closed Cases'){
    this.lawyerService.acceptOrRejectRcords('closed', this.lawyerId).subscribe((res: any) => {
      if (res) {
        this.accCaseList = res;
        this.selectedCase = this.accCaseList[0];
        this.app_id = this.accCaseList[0].id
        this.getAllTimeLines()
       this.caseClosedBtnShow = false
      }
    })
  }


}


  addLink() {
    const dialogRef = this.dialog.open(AddLinkDialog, {
      panelClass: ['link-modal', 'small-dialog'],
      data: {
        dataKey:this.app_id
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
    this.getAllMeeting()
    });
  }

  addComment() {
    const dialogRef = this.dialog.open(AddCommentDialog, {
      panelClass: ['link-modal', 'small-dialog'],
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
      panelClass: ['link-modal', 'small-dialog'],
      data: {
        dataKey:this.selectedCase
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
     
    });
  }

  
  addFile(){

    const dialogRef = this.dialog.open(addFileDialog, {
      panelClass: ['link-modal', 'small-dialog'],
      data: {
        dataKey:this.app_id
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {

    this.getAllLawyerFiles()
    });

  }


}



@Component({
  selector: 'app-delete-blogs',
  templateUrl: './delete.html',
  styleUrls: ['./timeline.component.scss']
})
export class deleteBlogsComponent implements OnInit {

  constructor(public diagolref: MatDialogRef<deleteBlogsComponent>,public fb:FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public lawyerService: LawyeregService,
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
  styleUrls: ['./timeline.component.scss']
})

export class AddLinkDialog {

  meetingLinkInput: boolean = true
  selected :any = 'online'

  meetingLinsFrom!: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddLinkDialog>,
    public fb: FormBuilder,
    public lawyerService: LawyeregService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public toastr: ToastrService,
    ){
  
  }


  ngOnInit(): void {
   this.meetingLinsFrom = this.fb.group({
    meet_link:['',[ Validators.required]],
    meet_date:['',[ Validators.required]],
    meet_time:['',[ Validators.required]],
    advocate_appointment: this.data.dataKey,
    meet_details:['',[ Validators.required]],
   })
  
  }

 cloceDialog(){
    this.dialogRef.close()
  }

meetingType(ev:any){

 if(ev.value == 'online'){
    this.meetingLinkInput = true
 } else if(ev.value == 'offline'){
  this.meetingLinkInput = false
 }
}

sendMeetings(){
  if(this.data.dataKey){
    this.lawyerService.secheduleMeeting(this.meetingLinsFrom.value).subscribe((res:any) =>{
      if(res){
       this.toastr.success('Meeting Link Sent  Successfully!', 'Success!')
       this.dialogRef.close(res)
      }
    },
    error =>{
      console.log(error)
      if(error.error.data){
        this.toastr.error('Already this time create meet link!', 'Error!')
      }
    }
    )
  }

}

}


@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.html',
  styleUrls: ['./timeline.component.scss']
})

export class AddCommentDialog {

  commentsFrom!:FormGroup

  constructor(public dialogRef: MatDialogRef<AddCommentDialog>,
    public fb: FormBuilder,
    public lawyerService: LawyeregService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public toastr: ToastrService,
    ){

  }

  ngOnInit(): void {
    this.commentsFrom = this.fb.group({
      comment:['',[ Validators.required]],
      advocate_appointment: this.data.dataKey,
      subject:['',[Validators.required]]
    })
    this.notesGet()
   }

   notesGet(){
    this.lawyerService.getSingleNotes(this.data.meeting_id).subscribe((res:any) => {
      if(res){
        this.commentsFrom = this.fb.group({
          comment:[res.comment,[ Validators.required]],
          subject:[res.subject,[Validators.required]]
        })
      }
    })
   }

   cloceDialog(){
    this.dialogRef.close()
  }
   addComment(){
    if(this.data.meeting_id){
      this.lawyerService.updateNotes(this.data.meeting_id, this.commentsFrom.value).subscribe((res:any) => {
        console.log(res)
        this.toastr.success('Meeting Notes Updated Successfully', 'Success!')
        this.dialogRef.close()
      })

    }else if(this.commentsFrom.valid){
      this.lawyerService.lawyerComment(this.commentsFrom.value).subscribe((res:any) =>{
        if(res){
          this.dialogRef.close(res)
          this.toastr.success('Comment Submint Successfully!', 'Success!')
        }
      })
    }
 
   }


}

@Component({
  selector: 'app-payment-link',
  templateUrl: './payment-link.html',
  styleUrls: ['./timeline.component.scss']
})

export class PaymentLinktDialog {

  paymentsLinsFrom!: FormGroup;

  constructor(public dialogRef: MatDialogRef<PaymentLinktDialog>,
    public fb: FormBuilder,
    public lawyerService: LawyeregService,
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

   cloceDialog(){
    this.dialogRef.close()
  }
   sendPaymentLinks(){
    if(this.paymentsLinsFrom.valid){
      this.lawyerService.paymentLinksSending(this.paymentsLinsFrom.value).subscribe((res:any) =>{
        if(res){
          this.toastr.success('Payment Link Send  Successfully!', 'Success!')
          this.dialogRef.close(res)
        }
      })
    }
   
   }


}


@Component({
  selector: 'app-add-file',
  templateUrl: './add-files.html',
  styleUrls: ['./timeline.component.scss']
})

export class addFileDialog {

  addFileFrom!: FormGroup;
  files:any
  fileName:any

  fileType:any
  fileSize:any
  constructor(public dialogRef: MatDialogRef<addFileDialog>,
    public fb: FormBuilder,
    public lawyerService: LawyeregService,
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

    if(this.files){
      this.lawyerService.lawyerCaseFileUpload(formData).subscribe((res:any) =>{
        if(res){
          this.toastr.success(' File Upload Successfully!', 'Success!')
          this.dialogRef.close(res)
        }
      })
    } 
   }

   cloceDialog(){
    this.dialogRef.close()
  }
   onFileChanged(event: any){
  
    this.files = event.target.files[0];
   this.fileName = event.target.files[0].name;
   this.fileType =  event.target.files[0].type
   this.fileSize =  event.target.files[0].size
  }

}



@Component({
  selector: 'app-closed-cases',
  templateUrl: './closed-cases.component.html',
  styleUrls: ['./timeline.component.scss']
})

export class ClosedCasesComponent {

  closedCasesForm!: FormGroup

  constructor(public diagolref: MatDialogRef<ClosedCasesComponent>,public lawyerService: LawyeregService, public router: Router, public datepipe: DatePipe,  public fb: FormBuilder,  @Inject(MAT_DIALOG_DATA) public data: any,){

  }

  ngOnInit(): void {
    this.closedCasesForm = this.fb.group({
      case_close_date:['',[ Validators.required]],
      case_status:['',[ Validators.required]],
      case_description:['',[ Validators.required]],
     })
     console.log(this.data)
  }

  cloceDialog(){
    this.diagolref.close()
  }

  closeCase(){
    if(this.closedCasesForm.valid && this.data.dataKey ){
      let reqData ={
    accepts_or_rejects:'closed',
    appointment_id: this.data.dataKey,
    case_close_date: this.datepipe.transform(this.closedCasesForm.value.case_close_date,'yyyy-MM-dd'),
      case_status: this.closedCasesForm.value.case_status,
      case_description:this.closedCasesForm.value.case_description,
  }

  this.lawyerService.appoibtmentStatus(reqData).subscribe((res:any) =>{
    if(res){
    this.router.navigate(['/lawyer-jdl/cases'])
    this.diagolref.close()
    }
  })
    
  
    }
  }

}