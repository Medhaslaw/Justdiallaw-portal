import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { lawyerApproveInterFace, LawyerData } from 'src/pages/components/lawyer-info/models/lawyer.interface';
import { appconfig } from 'src/providers/appconfig';



@Injectable({
  providedIn: 'root'
})
export class LawyerslistService {

  private showEventForm = new BehaviorSubject<boolean>(false);
  currentShowEventForm = this.showEventForm.asObservable();

  constructor(public appConfig:appconfig, public http: HttpClient) { }

   lawyersGet(lat:any, long:any):Observable<lawyerApproveInterFace>{
    return this.http.get<lawyerApproveInterFace>(this.appConfig.portalApp + 'lawyer_approve_get?latitude='+lat+'&logitude='+long)
  }

  editShowEventForm(newClick:any){
    this.showEventForm.next(newClick);
}


}
