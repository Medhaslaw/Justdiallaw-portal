import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LawyeregService } from 'src/services/lawyereg.service';

@Component({
  selector: 'app-create-time-slots',
  templateUrl: './create-time-slots.component.html',
  styleUrls: ['./create-time-slots.component.scss']
})
export class CreateTimeSlotsComponent implements OnInit {

  selected1 = '1';
  timeSlotForm!: FormGroup

  pageType:any = 'new'

  constructor(public fb: FormBuilder,
    public lawyerService :LawyeregService,
    public toaster:ToastrService,
    public router: Router
    ) { }

  ngOnInit(): void {
    this.timeSlotForm = this.fb.group({
      Advocate_start_time: ['', Validators.required],
      Advocate_end_time: ['', Validators.required],
      Advocate_time_interval: ['', Validators.required]
    })
    this.getSlots()
  }

  getSlots(){
    this.lawyerService.getCreateTimeSlots().subscribe((res:any) =>{
      if(res.length > 0){
        this.pageType = 'update'
        this.timeSlotForm = this.fb.group({
          Advocate_start_time: [res[0].Advocate_start_time, Validators.required],
          Advocate_end_time: [res[0].Advocate_end_time, Validators.required],
          Advocate_time_interval: [res[0].Advocate_time_interval, Validators.required]
        })
      }
    })
  }

  save() {
    if(this.timeSlotForm.valid){
     this.lawyerService.createTimeSlots(this.timeSlotForm.value).subscribe((res:any) =>{
      if(res){
  this.toaster.success('Created Time slots successfully','Successfully!')
   this.router.navigate(['/lawyer-jdl/home'])
      }
     },error =>{
      this.toaster.error(error.error.data,'Error!')
     })
    } else{
      this.toaster.error('Please fill all the mandatory fields',"Error!")
    }

  }

}
