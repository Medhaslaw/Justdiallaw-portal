import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss']
})
export class SubHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    
  }
  mailtoJustLaw(){
    window.open('mailto:support@justdiallaw.com', "_blank");
  }

  gotofb(){
    window.open('https://www.facebook.com/profile.php?id=61551214194374', "_blank");
  }
gotoLi(){
  window.open('https://www.linkedin.com/company/justdiallaw/', "_blank");
}
gotoTw(){
  window.open('https://twitter.com/JustDialLaw', "_blank");
}

gotoIns(){
  window.open('https://instagram.com/justdial_law?utm_source=qr&igshid=MzNlNGNkZWQ4Mg==', "_blank");
}

}
