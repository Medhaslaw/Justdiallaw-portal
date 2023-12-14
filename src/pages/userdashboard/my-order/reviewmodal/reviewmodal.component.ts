import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LawyeregService } from 'src/services/lawyereg.service';
import { UserregistationService } from 'src/services/userregistation.service';
@Component({
  selector: 'app-reviewmodal',
  templateUrl: './reviewmodal.component.html',
  styleUrls: ['./reviewmodal.component.scss']
})
export class ReviewmodalComponent implements OnInit {

  commentForm!:FormGroup
  lawyerId: any;
  lawyerData: any;
  rating3: any;

  starts=[1,2,3,4,5]
  rating=0;
  review: any;
  selectedRating:any;

  constructor(public fb: FormBuilder,public diagolref: MatDialogRef<ReviewmodalComponent>, 
    
    public toaster:ToastrService,
    
    public userService: UserregistationService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    



   }

  

  ngOnInit(): void {
    this.rating3 = 0;
    this.commentForm = this.fb.group({
      comment : ['', Validators.required],
      
    })
    console.log(this.data.timeslot.created_by.id)
  }

  reviewRating(rate:any){
    this.rating = rate
    console.log(this.rating)
    console.log(this.selectedRating )
      
   }
  save(){

    if(this.commentForm.value.comment && this.rating){
    let reqObj = {
      lawyer : this.data.timeslot.created_by.id,
      comment:this.commentForm.value.comment,
      stars:this.rating
    }
    this.userService.reviewPost(reqObj).subscribe((res:any) => {
      console.log(res)
      // this.review = res
      this.diagolref.close(res)
        this.commentForm.reset()
    })  
  } else{
this.toaster.error('Please Select The Stars and Leave The Comment',"Error!" ,{
  // countDuplicates:false
})
  }

    // let requestObject={
    //   user_id  : this.data.id,
    //   comment:this.commentForm.value.comment
    // }
    // this.lawyerservice.reviewPost(requestObject).subscribe(res =>{
    //   console.log(res)
    //   this.reject = res
    //   this.diagolref.close(res)
    //   this.commentForm.reset()
    // })
   
      // this.diagolref.close()
  
    
  }
  
  cloceDialog(){
    this.diagolref.close()
  }


}
