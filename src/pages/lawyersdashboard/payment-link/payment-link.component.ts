import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaymentLinkPopupComponent } from '../payment-link-popup/payment-link-popup.component';

@Component({
  selector: 'app-payment-link',
  templateUrl: './payment-link.component.html',
  styleUrls: ['./payment-link.component.scss']
})
export class PaymentLinkComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  openDialog() {
    const dialogRef = this.dialog.open(PaymentLinkPopupComponent, {
      panelClass:'payment-modal',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
  }

}
