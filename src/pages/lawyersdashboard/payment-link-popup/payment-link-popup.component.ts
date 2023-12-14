import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-link-popup',
  templateUrl: './payment-link-popup.component.html',
  styleUrls: ['./payment-link-popup.component.scss']
})
export class PaymentLinkPopupComponent implements OnInit {
  selected1 = '1';
  selected2 = '1';

  constructor(public diagolref: MatDialogRef<PaymentLinkPopupComponent>) { }

  ngOnInit(): void {
  }

}
