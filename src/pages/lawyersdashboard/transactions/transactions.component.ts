import { Component, OnInit } from '@angular/core';
import { TransactionWithdrawComponent } from '../transaction-withdraw/transaction-withdraw.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';


export interface PeriodicElement {
  time: string;
  service: string;
  date: string;
  amount: string,
  action:string,
}

const TRANSACTION_LIST: PeriodicElement[] = [
  {date: '01/01/2022', time: '7:30 PM', service: 'Legal Case', amount: '1500/-', action:'...'},
  {date: '01/01/2022', time: '7:30 PM', service: 'Legal Case', amount: '1500/-', action:'...'},
  {date: '01/01/2022', time: '7:30 PM', service: 'Legal Case', amount: '1500/-', action:'...'},
  {date: '01/01/2022', time: '7:30 PM', service: 'Legal Case', amount: '1500/-', action:'...'},
  {date: '01/01/2022', time: '7:30 PM', service: 'Legal Case', amount: '1500/-', action:'...'},
  {date: '01/01/2022', time: '7:30 PM', service: 'Legal Case', amount: '1500/-', action:'...'},
  {date: '01/01/2022', time: '7:30 PM', service: 'Legal Case', amount: '1500/-', action:'...'},
  {date: '01/01/2022', time: '7:30 PM', service: 'Legal Case', amount: '1500/-', action:'...'},
  

];


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  displayedColumns: string[] = ['date', 'time',  'service', 'amount', 'action'];
  dataSource = new MatTableDataSource (TRANSACTION_LIST);

  applyFilter(event :Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  constructor(public dialog: MatDialog ) { }

  ngOnInit(): void {
  }
  openDialog() {
    const dialogRef = this.dialog.open(TransactionWithdrawComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      
    });

}
}
