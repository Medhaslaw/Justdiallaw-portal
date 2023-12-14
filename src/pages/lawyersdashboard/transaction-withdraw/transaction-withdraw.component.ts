import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-transaction-withdraw',
  templateUrl: './transaction-withdraw.component.html',
  styleUrls: ['./transaction-withdraw.component.scss']
})
export class TransactionWithdrawComponent implements OnInit {

  constructor(public diagolref: MatDialogRef<TransactionWithdrawComponent>) { }

  ngOnInit(): void {
  }

}
