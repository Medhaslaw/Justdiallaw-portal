import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LawyeregService } from 'src/services/lawyereg.service';

@Component({
  selector: 'app-add-bank-details',
  templateUrl: './add-bank-details.component.html',
  styleUrls: ['./add-bank-details.component.scss']
})
export class AddBankDetailsComponent implements OnInit {

  bankDetails!: FormGroup
  addedBankDetails:any
  constructor(public formBuilder: FormBuilder, public lawyerService: LawyeregService,
    public toastr: ToastrService,
    public router: Router) { }

  ngOnInit(): void {
    this.bankDetails = this.formBuilder.group({
      account_holder_name: ['', Validators.required],
      bank_name: ['', Validators.required],
      account_number: ['', Validators.required],
      ifsc_code: ['', Validators.required],
      pan_number: ['', Validators.required],
      primary: [false,],
    })

    this.getBankDetials()

  }

  getBankDetials(){
    this.lawyerService.getBankDetials().subscribe((res:any) =>{
      if(res){
        console.log(res)
        this.addedBankDetails = res[0]
        this.bankDetails = this.formBuilder.group({
          account_holder_name: [this.addedBankDetails.account_holder_name, Validators.required],
          bank_name: [this.addedBankDetails.bank_name, Validators.required],
          account_number: [this.addedBankDetails.account_number, Validators.required],
          ifsc_code: [this.addedBankDetails.ifsc_code, Validators.required],
          pan_number: [this.addedBankDetails.pan_number, Validators.required],
          primary: [this.addedBankDetails.primary,],
        })
    

      }
    })
  }


  save() {

    if(this.addedBankDetails){
      this.lawyerService.editBanlDetials(this.bankDetails.value).subscribe((res:any) =>{
        if(res){
          this.toastr.success('Bank Details Update successfully!', 'Success!' )
          this.router.navigate(['/lawyer-jdl/profile'])
        }
       })

    } else if(this.bankDetails.valid){
     this.lawyerService.addBankDetials(this.bankDetails.value).subscribe((res:any) =>{
      if(res){
        this.toastr.success('Bank Details Added successfully!', 'Success!' )
        this.router.navigate(['/lawyer-jdl/profile'])
      }
     })

    }



  }


  cancelBtn() {

  }

}
