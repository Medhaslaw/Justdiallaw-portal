import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  date: string;
  id: string;
  minutepurchase:string;
  minutebalance: string;
  amount: string;
  gifitedto: string;
  expiries: string


}

const ELEMENT_DATA: PeriodicElement[] = [
  {date: '01/01/2022',  id: '#421526', minutepurchase:'Legal Case', minutebalance:'2000/-',amount:'1500/-',gifitedto:'Process', expiries:'02/12/2022'},
  {date: '01/01/2022',  id: '#421526', minutepurchase:'Legal Case', minutebalance:'2000/-',amount:'1500/-',gifitedto:'Process', expiries:'02/12/2022'},
  {date: '01/01/2022',  id: '#421526', minutepurchase:'Legal Case', minutebalance:'2000/-',amount:'1500/-',gifitedto:'Process', expiries:'02/12/2022'},
  {date: '01/01/2022',  id: '#421526', minutepurchase:'Legal Case', minutebalance:'2000/-',amount:'1500/-',gifitedto:'Process', expiries:'02/12/2022'},
  {date: '01/01/2022',  id: '#421526', minutepurchase:'Legal Case', minutebalance:'2000/-',amount:'1500/-',gifitedto:'Process', expiries:'02/12/2022'},
  {date: '01/01/2022',  id: '#421526', minutepurchase:'Legal Case', minutebalance:'2000/-',amount:'1500/-',gifitedto:'Process', expiries:'02/12/2022'},
  {date: '01/01/2022',  id: '#421526', minutepurchase:'Legal Case', minutebalance:'2000/-',amount:'1500/-',gifitedto:'Process', expiries:'02/12/2022'},
  {date: '01/01/2022',  id: '#421526', minutepurchase:'Legal Case', minutebalance:'2000/-',amount:'1500/-',gifitedto:'Process', expiries:'02/12/2022'},
  {date: '01/01/2022',  id: '#421526', minutepurchase:'Legal Case', minutebalance:'2000/-',amount:'1500/-',gifitedto:'Process', expiries:'02/12/2022'},
  {date: '01/01/2022',  id: '#421526', minutepurchase:'Legal Case', minutebalance:'2000/-',amount:'1500/-',gifitedto:'Process', expiries:'02/12/2022'},
 
 
];
@Component({
  selector: 'app-talk-ro-lawyer',
  templateUrl: './talk-ro-lawyer.component.html',
  styleUrls: ['./talk-ro-lawyer.component.scss']
})
export class TalkRoLawyerComponent implements OnInit {
  displayedColumns: string[] = ['date', 'id', 'minutepurchase','minutebalance', 'amount','gifitedto','expiries'];
  dataSource = new MatTableDataSource (ELEMENT_DATA);

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
