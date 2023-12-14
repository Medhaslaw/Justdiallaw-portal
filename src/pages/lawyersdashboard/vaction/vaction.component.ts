import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LawyeregService } from 'src/services/lawyereg.service';

@Component({
  selector: 'app-vaction',
  templateUrl: './vaction.component.html',
  styleUrls: ['./vaction.component.scss']
})
export class VactionComponent implements OnInit {

  vactionForm!: FormGroup

  lawyerData:any
  lawyerId:any
  todayDate:Date = new Date();
  
  constructor(public fb: FormBuilder,
    public datePipe: DatePipe,
    public lawyerService : LawyeregService ,
    private toastr: ToastrService,
    public router:Router
    ) { }

  ngOnInit(): void {

    this.vactionForm = this.fb.group({
      start_date:['',Validators.required],
      end_date:['',Validators.required]
    })
    let data:any = localStorage.getItem('jlLawyerData')
    this.lawyerData = JSON.parse(data)
    this.lawyerId = this.lawyerData[0].id
  }

  save(){
    let reqData = {
      advocate_id: this.lawyerId,
      start_date:this.datePipe.transform(this.vactionForm.value.start_date,'yyyy-MM-dd'),
      end_date:this.datePipe.transform(this.vactionForm.value.end_date,'yyyy-MM-dd'),
    }
    if(this.vactionForm.valid){
      this.lawyerService.lawyerVaction(reqData).subscribe((res:any) =>{
        if(res){
          this.toastr.success(this.datePipe.transform(this.vactionForm.value.start_date,'yyyy-MM-dd')+' ' + 'TO' +' '+ this.datePipe.transform(this.vactionForm.value.end_date,'yyyy-MM-dd')+ ' Your Vacation Leaves Confirm!', 'Confirm!');
          this.router.navigate(['/lawyer-jdl/home'])
        }
      })
    }
  

  }

}
