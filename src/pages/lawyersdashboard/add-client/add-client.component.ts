import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  selected = '1';
  selected1 = '1';
  selected2 = '1';
  startDate = new Date(1990, 0, 1);
  constructor() { }

  ngOnInit(): void {
  }

}
