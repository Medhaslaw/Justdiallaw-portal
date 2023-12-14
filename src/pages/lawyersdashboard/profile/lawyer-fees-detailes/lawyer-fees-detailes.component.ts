import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LawyeregService } from 'src/services/lawyereg.service';

@Component({
  selector: 'app-lawyer-fees-detailes',
  templateUrl: './lawyer-fees-detailes.component.html',
  styleUrls: ['./lawyer-fees-detailes.component.scss']
})
export class LawyerFeesDetailesComponent implements OnInit {

  feesEditForm!: FormGroup;
  lawyerFeesData:any

  constructor(public fb: FormBuilder,
    public lawyerService: LawyeregService,
    private toastr: ToastrService,
    public router: Router,
    ) { }

  ngOnInit(): void {
    this.feesEditForm = this.fb.group({
      phone_consultation_fees: ['', [Validators.required]],
      meeting_consultation_fees: ['', [Validators.required]],
      email_consultation_fees: ['', [Validators.required]],
      case_filing_fees: ['', [Validators.required]],
      per_appearance_fees: ['', [Validators.required]],
    })
    this.getLawyerFees()
  }

  editFess() {
    if(this.feesEditForm.valid){
      this.lawyerService.lawyerFeesDet(this.feesEditForm.value).subscribe((res:any) =>{
        if(res){
          this.toastr.success('Profile Updated Successfully!', 'Success!');
          this.router.navigate(['/lawyer-jdl/profile'])
        }
      })
    }
  }

  getLawyerFees(){
      this.lawyerService.lawyerFeesGet().subscribe((res:any) =>{
        if(res){
          this.lawyerFeesData = res

          this.feesEditForm = this.fb.group({
            phone_consultation_fees: [this.lawyerFeesData.phone_consultation_fees, [Validators.required]],
            meeting_consultation_fees: [this.lawyerFeesData.meeting_consultation_fees, [Validators.required]],
            email_consultation_fees: [this.lawyerFeesData.email_consultation_fees, [Validators.required]],
            case_filing_fees: [this.lawyerFeesData.case_filing_fees, [Validators.required]],
            per_appearance_fees: [this.lawyerFeesData.per_appearance_fees, [Validators.required]],
          })
        }
      })
  }


  cancelBtn(){

    if(this.lawyerFeesData.phone_consultation_fees >0 && this.lawyerFeesData.case_filing_fees >0 ){
      this.router.navigate(['/lawyer-jdl/profile'])
    } else{
      this.toastr.error('Please Fill The All Inputs','Error!')
    }
  }

  

}
