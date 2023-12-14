import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserregistationService } from 'src/services/userregistation.service';

export interface PeriodicElement {
  date: string;
  name: string;
  status: string;
  action: string;
}
export interface PeriodicElement1 {
  date: string;
  name: string;
  status: string;
  action: string;
  meeting_detalis:string
}
export interface PeriodicElement2 {
  Amount: string;
  id: string;
  productpurchased:string;
  date: string;
}
export interface PeriodicElement3 {
  eno: string;
  status: string;
  reply:string;
  date: string;
}



const ELEMENT_DATA: PeriodicElement[] = [
  {date: '01/01/2022', name: 'Raju', status: 'pending', action: '...'},
  {date: '01/01/2022', name: 'Raju', status: 'pending', action: '...'},
  {date: '01/01/2022', name: 'Raju', status: 'pending', action: '...'},
  {date: '01/01/2022', name: 'Raju', status: 'pending', action: '...'},
  {date: '01/01/2022', name: 'Raju', status: 'pending', action: '...'},
];
// const ELEMENT_DATA1: PeriodicElement1[] = [
//   {date: '01/01/2022', name: 'Raju', status: 'pending', action: '...'},
//   {date: '01/01/2022', name: 'Sai', status: 'Completed', action: '...'},
//   {date: '01/01/2022', name: 'Raju', status: 'pending', action: '...'},
//   {date: '01/01/2022', name: 'Raju', status: 'Progress', action: '...'},
//   {date: '01/01/2022', name: 'Raju', status: 'pending', action: '...'},
// ];
const ELEMENT_DATA2: PeriodicElement2[] = [
  {id: '#145395',date: '01/01/2022', productpurchased: 'Legal Case', Amount: '1500/-'},
  {id: '#145395',date: '01/01/2022', productpurchased: 'Legal Case', Amount: '1500/-'},
  {id: '#145395',date: '01/01/2022', productpurchased: 'Legal Case', Amount: '1500/-'},
  {id: '#145395',date: '01/01/2022', productpurchased: 'Legal Case', Amount: '1500/-'},
  {id: '#145395',date: '01/01/2022', productpurchased: 'Legal Case', Amount: '1500/-'},
  {id: '#145395',date: '01/01/2022', productpurchased: 'Legal Case', Amount: '1500/-'},
];
const ELEMENT_DATA3: PeriodicElement3[] = [
  {eno: '#145395',date: '01/01/2022', status: 'Progress', reply: '25'},
  {eno: '#145395',date: '01/01/2022', status: 'pending', reply: '30-'},
  {eno: '#145395',date: '01/01/2022', status: 'Progress', reply: '20'},
  {eno: '#145395',date: '01/01/2022', status: 'Completed', reply: '35'},
  {eno: '#145395',date: '01/01/2022', status: 'pending', reply: '40'},
  {eno: '#145395',date: '01/01/2022', status: 'Completed', reply: '45'},
];

@Component({
  selector: 'app-profiledashboard',
  templateUrl: './profiledashboard.component.html',
  styleUrls: ['./profiledashboard.component.scss']
})
export class ProfiledashboardComponent implements OnInit {

  displayedColumns: string[] = ['date', 'name', 'status', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>;

  displayedColumns1: string[] = [ 'status', 'name','link', 'meeting_detalis', 'action'];
  dataSource1 = new MatTableDataSource<PeriodicElement1>;

  displayedColumns2: string[] = ['id','date','productpurchased','Amount',];
  dataSource2 = ELEMENT_DATA2;

  displayedColumns3: string[] = ['eno','date','status','reply',];
  dataSource3 = ELEMENT_DATA3;

  allCaseList :any
  userId:any

  allAppointmentList:any
  constructor(
    public userService: UserregistationService,
    public router:Router

  ) { }

  joinNow(obj:any){
    if(obj.meet_link){
      window.open(obj.meet_link, '_blank')
    }
  }


  ngOnInit(): void {

    let data: any = localStorage.getItem('userData')
    this.userId = JSON.parse(data)[0].id;
    this.getCases()

    this.getUserDashBoardCounts()

    this.gettAllAppointment()
  }

  userCounts:any
  getUserDashBoardCounts(){
    this.userService.dashBoradUserCounts().subscribe((res:any) =>{
      if(res){
        this.userCounts = res
      }
    })
  }


  getCases() {
    this.userService.acceptsCase('accept',this.userId).subscribe((res:any) =>{
      if (res.length > 0) {
        this.allCaseList = res.slice(0,6)
        this.dataSource = new MatTableDataSource(this.allCaseList.reverse())
      }
    })
  }

  gettAllAppointment(){
    this.userService.allMeetings().subscribe((res:any) =>{
      if(res){
        console.log(res)
        this.allAppointmentList = res.new;
        this.dataSource1 = new MatTableDataSource(this.allAppointmentList)
      }
    })
  }

  getTooltip(elemen:any): any {
      return elemen
  }

  viewDetails(obj:any){
    this.router.navigate(['/my-jdl/user-timelines/'+ obj.id])
  }

}
