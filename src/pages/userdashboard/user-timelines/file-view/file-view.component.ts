import { Component, OnInit } from '@angular/core';
import { appconfig } from 'src/providers/appconfig';
import { UserregistationService } from 'src/services/userregistation.service';

@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.scss']
})
export class FileViewComponent implements OnInit {

  file_id:any
  fileData:any
  fileUrl:any
  
  constructor(
    public userService : UserregistationService,
    public _appConfig: appconfig,
  ) { }

  ngOnInit(): void {
    let url:any = document.URL.split('/')[document.URL.split('/').length - 1]
    this.file_id = url
    this.getFillData()
    this.fileUrl = this._appConfig.IMG_Url;
  }
getFillData(){
  this.userService.viewFile(this.file_id).subscribe((res:any) =>{
    if(res){
      this.fileData = res[0]
      console.log(res[0].client_files)
    }
  })
}

onLoad(event:any) {
  console.log("onload", event);
}
}
