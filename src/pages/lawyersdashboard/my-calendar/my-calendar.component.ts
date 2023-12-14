import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions ,EventInput} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { LawyeregService } from 'src/services/lawyereg.service';
import { SlotsBlockingModelComponent } from './slots-blocking-model/slots-blocking-model.component';


@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.component.html',
  styleUrls: ['./my-calendar.component.scss']
})
export class MyCalendarComponent implements OnInit {

  lawyerData:any
  lawyerId:any

  Events: any[] = [];

  events_data:any

  timeSlotsDate!:any
  thimeSlotsTime!:any

  constructor( public lawyerService: LawyeregService, public dialog: MatDialog, ) { }

  ngOnInit(): void {

  let data:any = localStorage.getItem('jlLawyerData')
  this.lawyerData = JSON.parse(data)
  this.lawyerId = this.lawyerData[0].id
  
  // console.log(this.timeSlotsDate, this.thimeSlotsTime)

  // this.getEvents()


  this.lawyerService.lawyerEvents(this.lawyerId).subscribe((res:any) =>{ 
   
    let  arrdate 
    let  arrtime
    for(let i = 0; i < res.length; i++){
         arrdate = res[i]?.date
      arrtime = res[i]?.timeslot.Advocate_timing_slot
      this.Events.push({title:arrtime, date:arrdate});
    }

    setTimeout(() => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick.bind(this),
        events: this.Events,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      plugins: [dayGridPlugin,interactionPlugin,timeGridPlugin],
      };
    }, 1500);
  })
  

  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin,interactionPlugin,timeGridPlugin],
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    // weekends: false,
    // dateClick: function(info) {
    // },
    // events: this.Events,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
    // events: [
    //   {title:this.thimeSlotsTime, date:this.timeSlotsDate},
    // ]
    
  };
  eventsPromise!: Promise<EventInput>;

  handleDateClick(arg:any) {
    alert('date click! ' + arg.dateStr)
  }

  // getEvents(){
  //     this.lawyerService.lawyerEvents(this.lawyerId).subscribe((res:any) =>{
  //        let events_data = res
  //         let events_date = events_data.map( function(val:any){
  //             return val.date
  //         })
        
  //         this.timeSlotsDate = events_date

  //         let events_time = events_data.map(function(val:any){
  //           return val.timeslot.Advocate_timing_slot
  //         })
  //         this.thimeSlotsTime = events_time

  //     })
  // }

  openSlotsBlockinDialog(){
    const dialogRef = this.dialog.open(SlotsBlockingModelComponent, {
      panelClass:'slots-blocking-modal',
      width: '30vw',
      height:'auto',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(res=>{
    })
  }

}
