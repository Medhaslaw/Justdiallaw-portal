import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import html2canvas from 'html2canvas';
import jspdf, * as jsPDF from 'jspdf';  
import { UserregistationService } from 'src/services/userregistation.service';



export interface PeriodicElement {
  date: string;
  id: string;
  Productpurchased: string;
  amount: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {date: '01/01/2022', id: '#225463', Productpurchased: 'Legal Case', amount: '1500/-'},
  {date: '01/01/2022', id: '#225463', Productpurchased: 'Legal Case', amount: '1500/-'},
  {date: '01/01/2022', id: '#225463', Productpurchased: 'Legal Case', amount: '1500/-'},
  {date: '01/01/2022', id: '#225463', Productpurchased: 'Legal Case', amount: '1500/-'},
  {date: '01/01/2022', id: '#125236', Productpurchased: 'Legal Case', amount: '1500/-'},
  {date: '01/01/2022', id: '#225463', Productpurchased: 'Legal Case', amount: '1500/-'},
  {date: '01/01/2022', id: '#225463', Productpurchased: 'Legal Case', amount: '1500/-'},
 
];

@Component({
  selector: 'app-transactons',
  templateUrl: './transactons.component.html',
  styleUrls: ['./transactons.component.scss']
})
export class TransactonsComponent implements OnInit {

  
  displayedColumns: string[] = ['date','amount', 'paynent_for','payment_status'];
  dataSource = new MatTableDataSource<PeriodicElement>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild('content') content!: ElementRef;  

  constructor(private userService: UserregistationService) { }

  ngOnInit(): void {
    this.getPayments()
  }

  dowloadInvoicePdf(divId:any){
    let data:any = document.getElementById(divId );  
    html2canvas(data).then((canvas:any) => {
    const contentDataURL = canvas.toDataURL('image/png')  // 'image/jpeg' for lower quality output.
    // let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
    let pdf = new jspdf('p', 'cm', 'a4'); //Generates PDF in portrait mode
    pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
    pdf.save('Filename.pdf');   
  }); 

  }

  userPayments:any
  getPayments(){
      this.userService.userPaymentsList().subscribe((res:any) =>{
        if(res){
          console.log(res)
          this.userPayments = res.data 
          this.dataSource =  this.userPayments
        }
      })
  }




}
