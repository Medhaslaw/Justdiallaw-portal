import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LawyeregService } from 'src/services/lawyereg.service';

export interface clientData {
  client_name: string;
  phone_no: string;
  email:string;
}



@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  imgUrl:any
  clientslList:any[] = []

  displayedColumns: string[] = [ 'client_name','phone_no', 'email',];
  dataSource = new MatTableDataSource<clientData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // appoinmentList:any[]=[];

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  constructor(public LawyerService: LawyeregService) { }

  ngOnInit(): void {
    this.getClientsData()
  }

  getClientsData(){
    this.LawyerService.clientsAllData().subscribe((res:any) =>{
      if(res.success){
        this.clientslList = res.data
        this.dataSource = new MatTableDataSource(this.clientslList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

}
