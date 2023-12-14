import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  selected = '1';
  selected1 = '1';
  startDate = new Date(1990, 0, 1);
  constructor() { }

  ngOnInit(): void {
  }

}
