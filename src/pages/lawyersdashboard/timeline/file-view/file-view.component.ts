import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.scss']
})
export class FileViewComponent implements OnInit {

  file_id:any

  constructor() { }

  ngOnInit(): void {
    let url:any = document.URL.split('/')[document.URL.split('/').length - 1]
    this.file_id = url
  }

}
