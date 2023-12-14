import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserregistationService } from 'src/services/userregistation.service';

export interface PeriodicElement {
  date: string;
  subject: string;
 Text: string;
  
}


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {


  displayedColumns: string[] = ['date', 'subject', 'text',];
  dataSource = new MatTableDataSource<PeriodicElement>;

  constructor(
    public userService: UserregistationService
  ) { }

  ngOnInit(): void {
    this.getAllFeedBacks()
  }

  feedbackList:any
  getAllFeedBacks(){
   this.userService.allFeedback().subscribe((res:any) =>{
    if(res){
      console.log(res)
      this.feedbackList = res
      this. dataSource = new MatTableDataSource(this.feedbackList);
    }
   })
  }

}
