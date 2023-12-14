import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';


export interface PeriodicElement {
  date: string;
  status: string;
  amount: string;
  action: string;
  name: string;
  service: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {date: '01/01/2022', status: 'Completed', service: 'process', name:'Jhon Due', amount:'7000/-',action:'...'},
  {date: '01/01/2022', status: 'pending', service: 'process',  name:'Jhon Due', amount:'7000/-',action:'...'},
  {date: '01/01/2022', status: 'Processing', service: 'process',  name:'Jhon Due', amount:'7000/-',action:'...'},
  {date: '01/01/2022', status: 'Completed', service: 'process',  name:'Jhon Due', amount:'7000/-',action:'...'},
  {date: '01/01/2022', status: 'pending', service: 'process',  name:'Jhon Due', amount:'7000/-',action:'...'},
  {date: '01/01/2022', status: 'Processing', service: 'process',  name:'Jhon Due', amount:'7000/-',action:'...'},
  {date: '01/01/2022', status: 'Completed', service: 'process',  name:'Jhon Due', amount:'7000/-',action:'...'},
  {date: '01/01/2022', status: 'pending', service: 'process',  name:'Jhon Due', amount:'7000/-',action:'...'},
  {date: '01/01/2022', status: 'Processing', service: 'process',  name:'Jhon Due', amount:'7000/-',action:'...'},
  {date: '01/01/2022', status: 'pending', service: 'process',  name:'Jhon Due', amount:'7000/-',action:'...'},
 
 
];

@Component({
  selector: 'app-pay-request',
  templateUrl: './pay-request.component.html',
  styleUrls: ['./pay-request.component.scss']
})
export class PayRequestComponent implements OnInit {
  displayedColumns: string[] = ['name', 'date', 'service','amount', 'status', 'action'];
  dataSource = new MatTableDataSource  (ELEMENT_DATA);

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
