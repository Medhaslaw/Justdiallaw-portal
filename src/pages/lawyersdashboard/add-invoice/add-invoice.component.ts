import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.scss']
})
export class AddInvoiceComponent implements OnInit {
  selected = '1';
  startDate = new Date(1990, 0, 1);
  constructor() { }

  ngOnInit(): void {
  }

}
