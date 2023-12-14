import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-enquiries',
  templateUrl: './enquiries.component.html',
  styleUrls: ['./enquiries.component.scss']
})
export class EnquiriesComponent implements OnInit {

  casesArray =[
    {
      civil:'Civil',
      status:'Open',
      describtion:'It is a long established fact that a reader will be distracted by the readable content.',
      name:'Sanjay',
      scheduletime:'07 Nov, 2022 11:00 AM',
      location:'Hyderabad,Telangana'
    },
    {
      civil:'Civil',
      status:'Open',
      describtion:'It is a long established fact that a reader will be distracted by the readable content.',
      name:'Sanjay',
      scheduletime:'07 Nov, 2022 11:00 AM',
      location:'Hyderabad,Telangana'
    },
    {
      civil:'Civil',
      status:'Open',
      describtion:'It is a long established fact that a reader will be distracted by the readable content.',
      name:'Sanjay',
      scheduletime:'07 Nov, 2022 11:00 AM',
      location:'Hyderabad,Telangana'
    },
    {
      civil:'Civil',
      status:'Open',
      describtion:'It is a long established fact that a reader will be distracted by the readable content.',
      name:'Sanjay',
      scheduletime:'07 Nov, 2022 11:00 AM',
      location:'Hyderabad,Telangana'
    },
    {
      civil:'Civil',
      status:'Open',
      describtion:'It is a long established fact that a reader will be distracted by the readable content.',
      name:'Sanjay',
      scheduletime:'07 Nov, 2022 11:00 AM',
      location:'Hyderabad,Telangana'
    },
    {
      civil:'Civil',
      status:'Open',
      describtion:'It is a long established fact that a reader will be distracted by the readable content.',
      name:'Sanjay',
      scheduletime:'07 Nov, 2022 11:00 AM',
      location:'Hyderabad,Telangana'
    },
    {
      civil:'Civil',
      status:'Open',
      describtion:'It is a long established fact that a reader will be distracted by the readable content.',
      name:'Sanjay',
      scheduletime:'07 Nov, 2022 11:00 AM',
      location:'Hyderabad,Telangana'
    },
    {
      civil:'Civil',
      status:'Open',
      describtion:'It is a long established fact that a reader will be distracted by the readable content.',
      name:'Sanjay',
      scheduletime:'07 Nov, 2022 11:00 AM',
      location:'Hyderabad,Telangana'
    },
    {
      civil:'Civil',
      status:'Open',
      describtion:'It is a long established fact that a reader will be distracted by the readable content.',
      name:'Sanjay',
      scheduletime:'07 Nov, 2022 11:00 AM',
      location:'Hyderabad,Telangana'
    },
    {
      civil:'Civil',
      status:'Open',
      describtion:'It is a long established fact that a reader will be distracted by the readable content.',
      name:'Sanjay',
      scheduletime:'07 Nov, 2022 11:00 AM',
      location:'Hyderabad,Telangana'
    }
  ];
  casesAnsweres = [
    {
      civil:'',
      status:'',
      describtion:'',
      name:'',
      scheduletime:'',
      location:''
    }
  ];
  opendCases = [
    {
      title:'Any Other Legal Issue',
      status:'Open',
      name:'Sanjay',
      scheduletime:'07 Nov, 2022 11:00 AM',
      location:'Hyderabad,Telangana',
      describtion:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum '

    },
    {
      title:'Any Other Legal Issue',
      status:'Open',
      name:'Sanjay',
      scheduletime:'07 Nov, 2022 11:00 AM',
      location:'Hyderabad,Telangana',
      describtion:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum '

    },
    {
      title:'Any Other Legal Issue',
      status:'Open',
      name:'Sanjay',
      scheduletime:'07 Nov, 2022 11:00 AM',
      location:'Hyderabad,Telangana',
      describtion:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum '

    },
    {
      title:'Any Other Legal Issue',
      status:'Open',
      name:'Sanjay',
      scheduletime:'07 Nov, 2022 11:00 AM',
      location:'Hyderabad,Telangana',
      describtion:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum '

    },
    {
      title:'Any Other Legal Issue',
      status:'Open',
      name:'Sanjay',
      scheduletime:'07 Nov, 2022 11:00 AM',
      location:'Hyderabad,Telangana',
      describtion:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum '

    },
    {
      title:'Any Other Legal Issue',
      status:'Open',
      name:'Sanjay',
      scheduletime:'07 Nov, 2022 11:00 AM',
      location:'Hyderabad,Telangana',
      describtion:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum '

    },
    {
      title:'Any Other Legal Issue',
      status:'Open',
      name:'Sanjay',
      scheduletime:'07 Nov, 2022 11:00 AM',
      location:'Hyderabad,Telangana',
      describtion:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum '

    },
  ]
  fixed!: boolean;
  @ViewChild('stickyMenu')
  menuElement!: ElementRef;

 
  elementPosition: any;
  navbarfixed: boolean = false;
  constructor() { }
  // @HostListener("window:scroll", ['$event'])
  // onWindowScroll($event:any) {
  //   let top = window.scrollY;     
  //   if (top > 5) {
  //     this.fixed = true;
      
  //   } else if (this.fixed && top < 5) {
  //     this.fixed = false;
     
  //   }
  // }

  ngOnInit(): void {
  }
 @HostListener('window:scroll', ['$event']) onscroll(){

  if(window.scrollY > 50){
    this.navbarfixed = true;
  }else{
    this.navbarfixed = false
  }
 }

}
