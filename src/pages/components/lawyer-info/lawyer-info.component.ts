import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lawyer-info',
  templateUrl: './lawyer-info.component.html',
  styleUrls: ['./lawyer-info.component.scss']
})
export class LawyerInfoComponent implements OnInit {

  @Input('type') type:any;

  constructor() { }

  ngOnInit(): void {
  }

}
