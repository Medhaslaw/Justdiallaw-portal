import { Component, OnInit } from '@angular/core';
import { LawyeregService } from 'src/services/lawyereg.service';

export interface PeriodicElement {
  eqnumber: string;
  position: number;
  enqdetails: string;
  date: string;
  readmore: string,
  place:string;
  action:string,
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, eqnumber: 'LKENQ009603', enqdetails: 'He is not give an He is not give an He is not give an He is not give an', readmore:'Read more', date: 'Nov 21, 2022 3:19 PM', place:'Hyderabad', action:'Reply'},
  {position: 2, eqnumber: 'LKENQ009603', enqdetails: 'He is not give an He is not give an He is not give an He is not give an', readmore:'Read more', date: 'Nov 21, 2022 3:19 PM', place:'Hyderabad', action:'Reply'},
  {position: 3, eqnumber: 'LKENQ009603', enqdetails: 'He is not give an He is not give an He is not give an He is not give an', readmore:'Read more', date: 'Nov 21, 2022 3:19 PM', place:'Hyderabad', action:'Reply'},
  {position: 4, eqnumber: 'LKENQ009603', enqdetails: 'He is not give an He is not give an He is not give an He is not give an', readmore:'Read more', date: 'Nov 21, 2022 3:19 PM', place:'Hyderabad', action:'Reply'},
  {position: 5, eqnumber: 'LKENQ009603', enqdetails: 'He is not give an He is not give an He is not give an He is not give an', readmore:'Read more', date: 'Nov 21, 2022 3:19 PM', place:'Hyderabad', action:'Reply'},
  {position: 6, eqnumber: 'LKENQ009603', enqdetails: 'He is not give an He is not give an He is not give an He is not give an', readmore:'Read more', date: 'Nov 21, 2022 3:19 PM', place:'Hyderabad', action:'Reply'},
  {position: 7, eqnumber: 'LKENQ009603', enqdetails: 'He is not give an He is not give an He is not give an He is not give an', readmore:'Read more', date: 'Nov 21, 2022 3:19 PM', place:'Hyderabad', action:'Reply'},
  {position: 8, eqnumber: 'LKENQ009603', enqdetails: 'He is not give an He is not give an He is not give an He is not give an', readmore:'Read more', date: 'Nov 21, 2022 3:19 PM', place:'Hyderabad', action:'Reply'},

 

];

@Component({
  selector: 'app-dashboardhome',
  templateUrl: './dashboardhome.component.html',
  styleUrls: ['./dashboardhome.component.scss']
})
export class DashboardhomeComponent implements OnInit {
  panelOpenState = false;

  displayedColumns: string[] = ['position', 'eqnumber',  'enqdetails', 'date', 'place', 'action'];
  dataSource = ELEMENT_DATA;
  titles: any;
  

  constructor(public lawyerService: LawyeregService,) { }

  ngOnInit(): void {
    this.getCaptions()
  }

  getCaptions(){
    this.lawyerService.lawywerDashboard().subscribe((res:any) => {
      if(res){
        this.titles = res
        console.log(this.titles)
      }
    })
  }


}
