import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appconfig } from 'src/providers/appconfig';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
 

  constructor(public appConfig:appconfig, public http: HttpClient) {
   }
  orderIdApi(amount:any):Observable<any>{
  return this.http.post(this.appConfig.portalApp+'payment_start',amount)
  }

  sendPaymentData(data:any):Observable<any>{
    return this.http.post(this.appConfig.portalApp+'store_payment',data)
  }

  PaymentDetails(data:any):Observable<any>{
    return this.http.post(this.appConfig.portalApp+'Update_Appointment_in_PaymentDetails',data)
  }


  documentBuyOrderIdApi(data:any){
    return this.http.post(this.appConfig.userLogin+'document_payment_start',data)
  }

  documentSendPaymentData(data:any){
    return this.http.post(this.appConfig.userLogin+'document_store_payment',data)
  }

 

}
