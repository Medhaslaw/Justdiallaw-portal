import { Component,Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-cases',
  templateUrl: './view-cases.component.html',
  styleUrls: ['./view-cases.component.scss']
})
export class ViewCasesComponent implements OnInit {

  constructor(public diagolref: MatDialogRef<ViewCasesComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
   console.log(this.data)
  }

}
