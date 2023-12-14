import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LawyeregService } from 'src/services/lawyereg.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-slots-blocking-model',
  templateUrl: './slots-blocking-model.component.html',
  styleUrls: ['./slots-blocking-model.component.scss']
})
export class SlotsBlockingModelComponent implements OnInit {

  mrgSlots:any
  aftSlots:any
  evngSlots:any
  allTimeSlots:any


  todayDate:Date = new Date();

  slotsBlockingForm!: FormGroup

  dateInputShow: boolean = true
  slotShow: boolean = false

  lawyerData:any
  lawyerId:any
  constructor(public fb: FormBuilder,public lawyerService:LawyeregService,
    public datePipe: DatePipe, public toastr: ToastrService,
    public router: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SlotsBlockingModelComponent>,
    ) { }

  ngOnInit(): void {
    this.slotsBlockingForm = this.fb.group({
      date:['',[Validators.required]]
    })

  let data:any = localStorage.getItem('jlLawyerData')
  this.lawyerData = JSON.parse(data)
  this.lawyerId = this.lawyerData[0].id
  }

  cloceDialog(){
    this.dialogRef.close()
  }
  selectDate(){
     this.lawyerService.lawyerOverllSlots(this.lawyerId,this.datePipe.transform(this.slotsBlockingForm.value.date, 'yyyy-MM-dd')).subscribe((res:any) =>{
        if(res){
         this.slotShow = true
         this.dateInputShow = false
         this.allTimeSlots = res.overal_slots
         this.bookedSlots()
         this.getBlockedSlots()
        }
     })
  }

  bookingSlots:any[] = []
  bookedSlots(){
     this.bookingSlots =[]
    this.lawyerService.bookedAllSlots(this.lawyerId,this.datePipe.transform(this.slotsBlockingForm.value.date, 'yyyy-MM-dd')).subscribe((res:any) =>{
     if(res){
      console.log(res)
      res.forEach((slot: any) => {
         this.bookingSlots.push(slot.timeslot.id)
      })
     }
    })
  }

selectedTimeSlotsId:any[] =[]
selectblockTimeSlots(time_id:any){

    if(this.selectedTimeSlotsId.includes(time_id) || this.bookingSlots.includes(time_id)){
      let index:any = this.selectedTimeSlotsId.indexOf(time_id)
      this.selectedTimeSlotsId.splice(index,1)
    } else {
      this.selectedTimeSlotsId.push(time_id)
    }
    console.log(this.selectedTimeSlotsId)
  }

  proceedToBlock(){

    let reqData = {
      advocate_id:this.lawyerId,
      date:this.datePipe.transform(this.slotsBlockingForm.value.date,'yyyy-MM-dd'),
      timeslots:this.selectedTimeSlotsId
    }
    this.lawyerService.lawyerSlotsBlocking(reqData)
    .subscribe((res:any) =>{
       if(res){
        this.toastr.success('Selected Time Slots Blocked successfully!', 'Success!');
        this.dialogRef.close(res)
       }
    })
  }

  blockedSlots:any[] = []
  getBlockedSlots(){
    this.blockedSlots =[]
    this.lawyerService.getAllBlockedSlots(this.lawyerId,this.datePipe.transform(this.slotsBlockingForm.value.date,'yyyy-MM-dd'))
    .subscribe((res:any) =>{
      res.data.forEach((slots:any) =>{
        this.blockedSlots.push(slots.id)
      })
    })
  }

  


}
