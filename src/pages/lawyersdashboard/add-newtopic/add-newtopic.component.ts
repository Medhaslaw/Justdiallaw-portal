import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-newtopic',
  templateUrl: './add-newtopic.component.html',
  styleUrls: ['./add-newtopic.component.scss']
})
export class AddNewtopicComponent implements OnInit {

  constructor(public diagolref: MatDialogRef<AddNewtopicComponent>) { }

  ngOnInit(): void {
  }

}
