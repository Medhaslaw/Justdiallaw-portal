import { Component, OnInit } from '@angular/core';
import { AddNewtopicComponent } from '../add-newtopic/add-newtopic.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-judement',
  templateUrl: './judement.component.html',
  styleUrls: ['./judement.component.scss']
})
export class JudementComponent implements OnInit {

  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddNewtopicComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

}
}



