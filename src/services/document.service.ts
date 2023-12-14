import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { map, Observable } from 'rxjs';
import { appconfig } from 'src/providers/appconfig';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(public appCofg: appconfig, public http: HttpClient) { }

  getDocumentDetails(docVal:any):Observable<any>{
 return this.http.get(this.appCofg.portalApp+'DocumentGetBasedOnSubcaregory?document_sub_category='+docVal)
  }

  getStartupDetails(docVal:any):Observable<any>{
    return this.http.get(this.appCofg.portalApp+'StartupGetBasedOnSubcaregory?startup_sub_category='+docVal)
     }

     getUserLocale(): any {
      // Detect user location or preferred language
      // For example, you can use the browser's navigator object
      const userLocale = navigator.language ; // Default to English
      return userLocale;
    }

   

}
 