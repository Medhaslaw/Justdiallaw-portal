import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-distric-court-case',
  templateUrl: './add-distric-court-case.component.html',
  styleUrls: ['./add-distric-court-case.component.scss']
})
export class AddDistricCourtCaseComponent implements OnInit {
  selected2 = '1';
  selected1 = '1';
  selected = '1';
  selected3 = '1';
  selected4 = '1';
  selected5 = '1';
  selected6 = '1';
  selected7 = '1';

  clientArray:any [] =[]

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  addInput(){
    this.clientArray.push({clientName:''})
  }

  removeInput(){
    this.clientArray.splice(0,1);
  }
}
