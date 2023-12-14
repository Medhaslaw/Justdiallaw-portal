import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { appconfig } from 'src/providers/appconfig';
import { PortalService } from 'src/services/portal.service';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DatePipe, Location } from '@angular/common';

@Component({
  selector: 'app-blogs-about',
  templateUrl: './blogs-about.component.html',
  styleUrls: ['./blogs-about.component.scss']
})
export class BlogsAboutComponent implements OnInit {

  blogTitle: any
  blogData: any
  imgUrl: any
  blogId: any;
  role:any

  blog_url:any

  constructor(public router: Router,
    public portalService: PortalService,
    public appConfig: appconfig,
    private location: Location,
  ) { }

  ngOnInit(): void {
    let url: any = document.URL.split('/')[document.URL.split('/').length - 3];
    this.blogId = document.URL.split('/')[document.URL.split('/').length - 2];
    this.role = document.URL.split('/')[document.URL.split('/').length - 1];
    this.blogTitle = url.replaceAll('-', ' ');
    this.blog_url =document.URL
    this.imgUrl = this.appConfig.IMG_Url

    console.log(this.role)
    
    if(this.role === 'Admin'){
      this.getBlog()
    } else{
     this.getLawyerArtical()
    }


    window.onscroll = function () { myFunction() };

    let header: any = document.getElementById("myHeader");
    let sticky = header.offsetTop;

    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }

 
  }

  getBlog() {
    this.portalService.blogSingleGet(this.blogId).subscribe((res: any) => {
      if (res.success === true) {
        this.blogData = res.data[0]
      }
    })
  }

  getLawyerArtical(){
    this.portalService.lawyerAllArtical(this.blogId).subscribe((res:any) =>{
      if(res){
        this.blogData = res.data[0]
      }
    })
  }

  // today_date!: Date

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    // plugins: [ interactionPlugin ],
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    // weekends: false,
    // dateClick: function(info) {

    // },
    events: [
      // { title: 'Meeting', start: new Date() },
      // {title:'meeting',date: '2023-02-24'},
      // {title:'meeting',date: '2023-02-24'},
      // {title:'meeting',date: '2023-02-24'},
    ]
  };
  eventsPromise!: Promise<EventInput>;

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr)
  }

  shareOnFacebook() {
    const urlToShare = this.blog_url;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`;
    window.open(facebookShareUrl, '_blank', 'width=600,height=400');
  }

  shareOnWhatsApp(){
    const currentUrl = this.location.path();
    const message = `Check out this link: ${window.location.origin}${currentUrl}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  }

  shareTwitter(){
    const urlToShare = this.blog_url; 
    const tweetText = 'Check out X&Y Blog!';
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(urlToShare)}&text=${encodeURIComponent(tweetText)}`;
    window.open(twitterUrl, '_blank');
  }

  shareOnLinkedIn() {
    const url = encodeURIComponent(this.blog_url);
    const title = encodeURIComponent(this.blogTitle);
    const description = encodeURIComponent('X&Y Health Care');
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${description}`;
    window.open(shareUrl, '_blank');
  }

}
