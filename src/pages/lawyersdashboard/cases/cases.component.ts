import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { LeadData } from 'src/pages/components/lawyer-info/models/lead.interface';
import { LawyeregService } from 'src/services/lawyereg.service';

export interface casesData {
client:{
  first_name:string,
  last_name:string
  phone:any,
  date:string,
  slot:string,
  status:string,
  },
  timeslot:{
    created_by:{
      id:number
    }
  }
}

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CasesComponent implements OnInit {


  lawyerId:any
  myLeadList:any[]=[];

 todayDateandtime:any = new Date()
  todayDate:any;
  todayTime:any;
  nextTwoDays:any
 nextTwoDaysDate:any
 nextTwoDaysTime:any

  displayedColumns: string[] = ['case_id','client', 'phone', 'date', 'slot',];
  displayedColumns1: string[] = ['id', 'client', 'desc', 'date', 'meetingdate','casetype','status', 'action'];
  dataSource!: MatTableDataSource<casesData>;

  cassList:casesData[]=[]
  allCaseList!:MatTableDataSource<casesData>;


  accCaseList:casesData[]=[]
  accAllCasesList!:MatTableDataSource<casesData>;


  rejCaseList:casesData[]=[]
  rejAllCasesList!:MatTableDataSource<casesData>;

  closeCaseList:casesData[]=[]
  closeAllCasesList!:MatTableDataSource<casesData>;


  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
@ViewChildren(MatSort) sort = new QueryList<MatSort>();




  constructor( public lawyerService: LawyeregService, public router: Router,private dialog: MatDialog, public datePipe: DatePipe,  ) { }

  ngOnInit(): void {
    let data: any = localStorage.getItem('jlLawyerData')
    this.lawyerId = JSON.parse(data)[0].id;
    this.getAllCases()

    this.todayDate =  this.datePipe.transform(this.todayDateandtime, 'yyyy-MM-dd')
    this.todayTime =  this.datePipe.transform(this.todayDateandtime, 'HH:mm')
    
    this.nextTwoDays = new Date(this.todayDate);
    this. nextTwoDays.setDate(this.nextTwoDays.getDate() + 2)
    this.nextTwoDaysDate = this.datePipe.transform(this.nextTwoDays, 'yyyy-MM-dd')
    this.nextTwoDaysTime = this.datePipe.transform(this.nextTwoDays, 'HH:mm')
   
    console.log( this.nextTwoDays)
    console.log( this.nextTwoDaysDate)
    console.log( this.nextTwoDaysTime)
  }

  viewDetails(obj:any){
    this.router.navigate(['/lawyer-jdl/timeline/'+ obj.id])
  }

  getAllCases(){
    // this.lawyerService.getTodayCases().subscribe((res:any)=>{
      this.lawyerService.acceptOrRejectRcords('accept', this.lawyerId).subscribe((res: any) => {
      if(res.length > 0){
        this.cassList = res;
        this.allCaseList = new MatTableDataSource(this.cassList)
        this.allCaseList.paginator = this.paginator.toArray()[0];
        this.allCaseList.sort = this.sort.toArray()[0];
      }
    })
  }

  getTooltip(elemen:any): any {
    return elemen
  }
  


  onChange(event: MatTabChangeEvent){
    const tab = event.tab.textLabel;
    if(tab === 'Online Cases'){
      this.lawyerService.onlineOrOffline('online').subscribe((res:any) =>{
        if(res.data.length > 0){
          console.log(res)
          this.accCaseList = res.data ;
          this.accAllCasesList =  new MatTableDataSource(this.accCaseList)
          this.accAllCasesList.paginator = this.paginator.toArray()[1];
          this.accAllCasesList.sort = this.sort.toArray()[1];
        }
      })
    } 
    else if(tab === 'Offilne Cases'){
      this.lawyerService.onlineOrOffline('offline').subscribe((res:any) =>{
        if(res.data.length > 0){
          console.log(res)
          this.rejCaseList = res.data ;
          this.rejAllCasesList =  new MatTableDataSource(this.rejCaseList)
          this.rejAllCasesList.paginator = this.paginator.toArray()[2];
          this.rejAllCasesList.sort = this.sort.toArray()[2];
        }
           })
    } else if(tab === 'Closed Cases'){


      this.lawyerService.acceptOrRejectRcords('closed', this.lawyerId).subscribe((res:any) =>{
        if(res.length > 0){
          console.log(res)
          this.closeCaseList = res ;
          this.closeAllCasesList =  new MatTableDataSource(this.closeCaseList)
          this.closeAllCasesList.paginator = this.paginator.toArray()[3];
          this.closeAllCasesList.sort = this.sort.toArray()[3];
        }
           })


    }
  }

  rescheduleCase(ele:any){
    const dialogRef = this.dialog.open(Reschedule, {
      data:ele,
      panelClass: 'link-modal',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
     
       this.getAllCases()
     
    });
  }

}


@Component({
  selector: 'app-reschedule',
  templateUrl: './reschedule.html',
  styleUrls: ['./cases.component.scss']
})

export class Reschedule {

 
  constructor(public dialogRef: MatDialogRef<Reschedule>,
    public fb: FormBuilder, public lawyerService: LawyeregService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ){
  
  }

  ngOnInit(): void {
  this.data
  console.log(this.data)
  }

  accept() {
   if(this.data?.id){

    let reqData = {
      appointment_id:this.data.id
    }

    this.lawyerService.rescheduleCase(reqData).subscribe((res:any) =>{
      if(res){
        console.log(res)
        this.dialogRef.close()
      }
    })
   }


  }
  decline() {
    this.dialogRef.close()

  }

}
