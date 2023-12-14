import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { UserregistationService } from 'src/services/userregistation.service';

export interface casesData {
  client:{
    first_name:string,
    last_name:string
    phone:any,
    date:string,
    slot:string,
    },
    timeslot:{
      created_by:{
        id:number
      }
    }
  }

@Component({
  selector: 'app-user-cases',
  templateUrl: './user-cases.component.html',
  styleUrls: ['./user-cases.component.scss']
})
export class UserCasesComponent implements OnInit {

  userId:any
  cassList:any[]=[]
  allCaseList:any
  
  displayedColumns: string[] =  ['id', 'client', 'desc', 'date', 'meetingdate', 'action'];
  displayedColumns1: string[] =  ['id', 'client', 'desc', 'date', 'timing_slot',];

  dataSource = new MatTableDataSource<casesData>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( public router: Router,
    public userService: UserregistationService
    ) { }

  ngOnInit(): void {
    let data: any = localStorage.getItem('userData')
    this.userId = JSON.parse(data)[0].id;
    this.getAllCases()
  }
  viewDetails(obj:any){
    this.router.navigate(['/my-jdl/user-timelines/'+ obj.id])
  }

  getAllCases(){
    // this.lawyerService.getTodayCases().subscribe((res:any)=>{
      this.userService.acceptsCase('accept',  this.userId).subscribe((res: any) => {
        if(res.length > 0){
          this.cassList = res;
          this.allCaseList = new MatTableDataSource(this.cassList)
          this.allCaseList.paginator = this.paginator;
          this.allCaseList.sort = this.sort;
        }
      })
  }

  getTooltip(elemen:any): any {
    return elemen
  }

  cassListclosed:any[]=[]
  closedCases:any
  onChange(event: MatTabChangeEvent){
    const tab = event.tab.textLabel;
     if(tab == 'All Cases'){
      this.userService.acceptsCase('accept',  this.userId).subscribe((res: any) => {
        if(res.length > 0){
          this.cassList = res;
          this.allCaseList = new MatTableDataSource(this.cassList)
          this.allCaseList.paginator = this.paginator;
          this.allCaseList.sort = this.sort;
        }
      })
     } else if(tab == 'Closed Cases'){
      this.userService.acceptsCase('closed',  this.userId).subscribe((res: any) => {
        if(res.length > 0){
          this.cassListclosed = res;
          this.closedCases = new MatTableDataSource(this.cassListclosed)
          this.closedCases.paginator = this.paginator;
          this.closedCases.sort = this.sort;
        }
      })
     }
  }

}
