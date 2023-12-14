import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserregistationService } from 'src/services/userregistation.service';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.scss']
})
export class AddFeedbackComponent implements OnInit {

  addFeedbackForm!:FormGroup;
  constructor(public fb : FormBuilder,
    public userService: UserregistationService,
    public router : Router,
    public toastr: ToastrService
    ) { }

  ngOnInit(): void {

    this.addFeedbackForm = this.fb.group({
      feed_back_text:['',[Validators.required, ]],
      subject:['',[Validators.required, ]]
    })

  }

  saveFeedback(){
    if(this.addFeedbackForm.valid){
this.userService.addFeedback(this.addFeedbackForm.value).subscribe((res:any) =>{
  if(res){
    this.toastr.success('FeedBack Sended Successfully', 'Success')
    this.router.navigate(['/my-jdl/feedback'])
  }
},error =>{
  this.toastr.error(error.error.data, 'Error')
})
    }
  }

}
