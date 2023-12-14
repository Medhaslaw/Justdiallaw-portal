import { Component, OnInit } from '@angular/core';
import { LawyeregService } from 'src/services/lawyereg.service';

@Component({
  selector: 'app-help-support',
  templateUrl: './help-support.component.html',
  styleUrls: ['./help-support.component.scss']
})
export class HelpSupportComponent implements OnInit {
  panelOpenState = false;
  faqData: any;

  constructor(public lawyerService: LawyeregService,) { }

  ngOnInit(): void {
    this.faqsGet()
  }

  mailtoJustLawIndia(){
    window.open('mailto:support@medhaslaw.com', "_blank");
  }
  mailtoJustLawUsa(){
    window.open('mailto:Support@justdiallaw.com', "_blank");
  }

  faqsGet(){
    this.lawyerService.getFaqs().subscribe((res:any) => {
      if(res){
        this.faqData = res.data
        console.log(this.faqData)
      }
    })
  }
}
