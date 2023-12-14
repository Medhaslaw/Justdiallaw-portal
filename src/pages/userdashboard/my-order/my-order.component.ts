import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserregistationService } from 'src/services/userregistation.service';
import { ReviewmodalComponent } from './reviewmodal/reviewmodal.component';

export interface appoinmentData {
  assignedlawyer: string;
  timing_slot: string;
  created_on:string;
  action: string;
  status: string;
  
}



@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {

  displayedColumns: string[] = [ 'assignedlawyer', 'timing_slot','created_on','status',  'action'];
  dataSource = new MatTableDataSource<appoinmentData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  appoinmentList:any[]=[];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(public router: Router,public dialog: MatDialog, public userService: UserregistationService, ) { }

  ngOnInit(): void {
    this.getUserOrders()
  }

  openDialog(element:any){
    const diagolref = this.dialog.open(ReviewmodalComponent,{
      panelClass: 'CommentModal',
      data: element,
      disableClose: true,
     
    })
    diagolref.afterClosed().subscribe(res =>{
    })
  }
  getUserOrders(){
    this.userService.userAppoinment().subscribe((data:any) => {
      if(data){
        this.appoinmentList = data.data
        this. dataSource = new MatTableDataSource(this.appoinmentList.reverse());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

}
