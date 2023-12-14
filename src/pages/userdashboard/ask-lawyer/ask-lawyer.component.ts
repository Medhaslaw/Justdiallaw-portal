import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  date: string;
  docketno:string;
  message: string;
  action: string;
  totalreply: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {date: '01/01/2022',  message: 'process', docketno:'149523', totalreply:'70',action:'...'},
  {date: '01/01/2022',  message: 'process',  docketno:'149523', totalreply:'70',action:'...'},
  {date: '01/01/2022',  message: 'process',  docketno:'149523', totalreply:'70',action:'...'},
  {date: '01/01/2022',  message: 'process',  docketno:'149523', totalreply:'70',action:'...'},
  {date: '01/01/2022',  message: 'process',  docketno:'149523', totalreply:'70',action:'...'},
  {date: '01/01/2022',  message: 'process',  docketno:'149523', totalreply:'70',action:'...'},
  {date: '01/01/2022',  message: 'process',  docketno:'149523', totalreply:'70',action:'...'},
  {date: '01/01/2022',  message: 'process',  docketno:'149523', totalreply:'70',action:'...'},
  {date: '01/01/2022',  message: 'process',  docketno:'149523', totalreply:'70',action:'...'},
  {date: '01/01/2022',  message: 'process',  docketno:'149523', totalreply:'70',action:'...'},
 
 
];

@Component({
  selector: 'app-ask-lawyer',
  templateUrl: './ask-lawyer.component.html',
  styleUrls: ['./ask-lawyer.component.scss']
})
export class AskLawyerComponent implements OnInit {

  displayedColumns: string[] = ['docketno', 'date', 'message','totalreply', 'action'];
  dataSource = new MatTableDataSource (ELEMENT_DATA);

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
