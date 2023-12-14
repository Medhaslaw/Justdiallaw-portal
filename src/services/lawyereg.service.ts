import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { bookedTimeSlotsList } from 'src/pages/components/lawyer-info/models/dayslot.interface';
import { advocateRegInterFace, advocateUpdateInterFace, barCouncilInterFace, checkOtpInterFace, LawyerData, profileInfoInterFace, sendOtpInterFace } from 'src/pages/components/lawyer-info/models/lawyer.interface';
import { appconfig } from 'src/providers/appconfig';


interface UserDataDetails {
  username: string,
}




// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class LawyeregService {
 
  constructor(public apcofg: appconfig, public http: HttpClient) { }

 

  lawyerRegData(data: any): Observable<advocateRegInterFace[]> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //   })
    // };
    return this.http.post<advocateRegInterFace[]>(this.apcofg.lawyerReg + 'AdvocateReg', data)
  }

  updateLawyer(lawyerData: any, id: any): Observable<advocateUpdateInterFace[]> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //   })
    // };
    return this.http.put<advocateUpdateInterFace[]>(this.apcofg.lawyerReg + 'AdvocateAreaEdit/' + id, lawyerData)
  }



  sendOtp(data: any): Observable<sendOtpInterFace[]> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //   })
    // }
    return this.http.post<sendOtpInterFace[]>(this.apcofg.lawyerReg + 'AdvocateSendOTP', data).pipe(map(response => {
      return response
    }))
  }

  otpCheck(data: any): Observable<checkOtpInterFace[]> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //   })
    // }

    return this.http.post<checkOtpInterFace[]>(this.apcofg.lawyerReg + 'AdvocateOtpCheck', data);

  }

  getAllCategory(): Observable<LawyerData[]> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //   })
    // };
    return this.http.get<LawyerData[]>(this.apcofg.portalApp + 'lawyer_approve_get')
  }
  getProfileDetails():Observable<LawyerData[]>{
    const httpOptions = {headers: new HttpHeaders({
      'Authorization': 'Token '+ localStorage.getItem('lawyer-token'),
      'Content-Type': 'application/json'
    })}

    return this.http.get<LawyerData[]>(this.apcofg.portalApp + 'AllProfileGet',httpOptions);

  }

  getBarCouncilInfo():Observable<barCouncilInterFace[]>{
    // const httpOptions = {headers: new HttpHeaders({
    //   'Authorization': 'Token '+ localStorage.getItem('lawyer-token'),
    //   'Content-Type': 'application/json'
    // })}

    return this.http.get<barCouncilInterFace[]>(this.apcofg.lawyerReg + 'BarcouncilInfomationDetails');

  }

  getProfileInfo():Observable<profileInfoInterFace[]>{
    // const httpOptions = {headers: new HttpHeaders({
    //   'Authorization': 'Token '+ localStorage.getItem('lawyer-token'),
    //   'Content-Type': 'application/json',
    //   // 'Cross-Origin-Embedder-Policy': 'crossorigin'
    //   // 'Cross-Origin-Resource-Policy': 'same-site | same-origin | cross-origin'
    // })}

    return this.http.get<profileInfoInterFace[]>(this.apcofg.lawyerReg + 'ProfileLawyerDetails',);

  }

  saveBarCouncilInfo(data:any,url:any):Observable<LawyerData>{
    // const httpOptions = {headers: new HttpHeaders({
    //   'Authorization': 'Token '+ localStorage.getItem('lawyer-token'),
    // })}

    return this.http.post<LawyerData>(this.apcofg.lawyerReg + url, data);
  }

  updateBarCouncilInfo(data:any, url:any):Observable<LawyerData>{
    // const httpOptions = {headers: new HttpHeaders({
    //   'Authorization': 'Token '+ localStorage.getItem('lawyer-token'),
    // })}

    return this.http.put<LawyerData>(this.apcofg.lawyerReg + url, data);
  }


  profileInfoUpdate(data:any):Observable<LawyerData>{
    // const httpOptions = {headers: new HttpHeaders({
    //   'Authorization': 'Token '+ localStorage.getItem('lawyer-token'),
    //   'Content-Type': 'application/json'
    // })}

    return this.http.put<LawyerData>(this.apcofg.lawyerReg + 'ProfileLawyerDetails', data);

  }

  profileInfoSave(data:any):Observable<LawyerData>{
    // const httpOptions = {headers: new HttpHeaders({
    //   'Authorization': 'Token '+ localStorage.getItem('lawyer-token'),
    //   'Content-Type': 'application/json'
    // })}

    return this.http.post<LawyerData>(this.apcofg.lawyerReg + 'ProfileLawyerList', data);

  }

  updateProfile(data:any):Observable<LawyerData>{
    // const httpOptions = {headers: new HttpHeaders({
    //   'Authorization': 'Token '+ localStorage.getItem('lawyer-token'),
    //   'Content-Type': 'application/json'
    // })}

    return this.http.put<LawyerData>(this.apcofg.lawyerReg + 'AdvocateProfileEdit', data);

  }


  addresup(data:any, id:any):Observable<LawyerData[]>{
    // const httpOptions = {headers: new HttpHeaders({

    //   'Content-Type': 'application/json',
    // })}
    
    return this.http.put<LawyerData[]>(this.apcofg.lawyerReg + 'AdvocateAreaEdit/' + id, data)
  }

 
  profileImg(data:any):Observable<LawyerData>{
    // const httpOptions = {headers: new HttpHeaders({
    //   'Authorization': 'Token '+ localStorage.getItem('lawyer-token'),
    // })}
    
    return this.http.put<LawyerData>(this.apcofg.lawyerReg + 'Advocateimageedit', data)
  }



  getLeads():Observable<any>{
    // const httpOptions = {headers: new HttpHeaders({
    //   'Authorization': 'Token '+ localStorage.getItem('lawyer-token'),
    //   'Content-Type': 'application/json'
    // })}

    return this.http.get<any>(this.apcofg.lawyerReg+'LawerappointmetAllList');
  }

getTodayCases():Observable<any>{
  return this.http.get<any>(this.apcofg.lawyerReg+'AcceptCasesBasedonTodayDate');
}

  appoibtmentStatus(data:any):Observable<any>{
    // const httpOptions = {headers: new HttpHeaders({
    //   'Authorization': 'Token '+ localStorage.getItem('lawyer-token'),
    //   'Content-Type': 'application/json'
    // })}
    return this.http.post(this.apcofg.lawyerReg+'AcceptOrRejectCase',data)
  }


  acceptOrRejectRcords(accOrrej:any,lawerId:any):Observable<any>{

    // const httpOptions = {headers: new HttpHeaders({
    //   'Authorization': 'Token '+ localStorage.getItem('lawyer-token'),
    //   'Content-Type': 'application/json'
    // })}

    return this.http.get(this.apcofg.lawyerReg+'AcceptorRejectRcords?accepts_or_rejects='+accOrrej+'&lawer_id='+lawerId)

  }


  onlineOrOffline(onOroff:any):Observable<any>{
    return this.http.get(this.apcofg.lawyerReg+'AppoinmentsGetBasedonOnlineOrOffline?appointment_type='+onOroff)
  }


  lawyerAddBlogs(blogData:any):Observable<any>{
       return this.http.post(this.apcofg.lawyerReg+'AddBlogList',blogData)
  }

  lawyerAllArtical():Observable<any>{
    return this.http.get(this.apcofg.lawyerReg+'AddBlogList')
  }

lawyerEvents(lawyerId:any):Observable<any>{
 
  return this.http.get(this.apcofg.lawyerReg+'AllAdvocateappointmetList?advocate_id='+lawyerId)
}


lawyerOverllSlots(lawyerId:any,date:any):Observable<any>{
   return this.http.get(this.apcofg.lawyerReg+'AdvocateBookingslotsandoveralslots?advocate_id='+lawyerId+'&date='+date)
}

bookedAllSlots(lawyerId:any,date:any):Observable<any>{
  return this.http.get(this.apcofg.lawyerReg+'Advocatebookedslots?advocate_id='+lawyerId+'&date='+date)
}

createTimeSlots(data:any):Observable<any>{
  return this.http.post(this.apcofg.lawyerReg+'AdvocateTimeslotCreate',data)
}


getCreateTimeSlots():Observable<any>{
  return this.http.get(this.apcofg.lawyerReg+'AdvocateAllCreatedslots')
}

lawyerSlotsBlocking(data:any):Observable<any>{
   return this.http.post(this.apcofg.lawyerReg+'Advocateblocktheslots',data)
}


getAllBlockedSlots(lawyerId:any,date:any):Observable<any>{
  return this.http.get(this.apcofg.lawyerReg+'AllAppointmentscancelledTimeSlotList?advocate_id='+lawyerId+'&date='+date)
}

lawyerVaction(data:any):Observable<any>{
 return this.http.post(this.apcofg.lawyerReg+'Advocatevacationsdatelist',data)
}


lawyerFeesDet(data:any):Observable<any>{
   return this.http.put(this.apcofg.lawyerReg+'LawyerFeesDetailes',data)
}

lawyerFeesGet():Observable<any>{
  return this.http.get(this.apcofg.lawyerReg+'LawyerFeesDetailes')
}

clientsAllData():Observable<any>{
  return this.http.get(this.apcofg.lawyerReg+'AllAppointmentsClientDetailsBasedonAdvocate')
}


secheduleMeeting(data:any):Observable<any>{
return this.http.post(this.apcofg.lawyerReg+'CaseMeetingsList',data)
}

paymentLinksSending(data:any):Observable<any>{
return this.http.post(this.apcofg.lawyerReg+'PaymentLinkAdvocateList',data)
}

lawyerCaseFileUpload(data:any):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
    'Authorization': 'Token ' +  localStorage.getItem('lawyer-token')
    })
};
 
    // const httpOptions = {headers: new HttpHeaders({
    //   'Content-Type': 'multipart/form-data'
    // })}


return this.http.post(this.apcofg.lawyerReg+'FilesForCleintToAdvocateList',data, httpOptions)
}

lawyerAllFiles(app_id:any){
  return this.http.get(this.apcofg.lawyerReg+'FilesForCleintToAdvocateList?appointment_id='+app_id)
}

lawyerComment(data:any):Observable<any>{
return this.http.post(this.apcofg.lawyerReg+'CaseCommentList',data)
}

LawyerAllNotes(app_id:any):Observable<any>{
  return this.http.get(this.apcofg.lawyerReg+'AllCaseCommentBasedonAdvocate?appointment_id='+app_id)
}

lawyerAllMeeting(app_id:any):Observable<any>{
return this.http.get(this.apcofg.lawyerReg+'AllMeetingsBasedonAdvocate?appointment_id='+app_id)
}

accpectAllCase(app_id:any):Observable<any>{
  return this.http.get(this.apcofg.lawyerReg+'AllDetailsCaseBasedOnAppointmentId?appointment_id='+app_id)
}

deleteFile(file_id:any):Observable<any>{
  return this.http.delete(this.apcofg.lawyerReg+'DeleteFilesBasedOnCreator?file_id='+file_id)
}

appointmentData(app_Id:any):Observable<any>{
  return this.http.get(this.apcofg.lawyerReg+'AppointmentDetailsBasedOnAppontmentID?appointment_id='+app_Id)
}

rescheduleCase(case_id:any):Observable<any>{
return this.http.post(this.apcofg.lawyerReg+'AppointmentRescheduled',case_id)
}

lawyerCharges():Observable<any>{
return this.http.get(this.apcofg.lawyerReg+'LawyerFeesDetailes')
}

lawyeravailable(data:any):Observable<any> {
  return this.http.post(this.apcofg.lawyerReg+'MobileorEmailAccept',data)
}

articleEdit(id:any):Observable<any>{
  return this.http.get(this.apcofg.lawyerReg + 'AddBlogAllDetailes/' + id);

}
articleUpdate(id:any,data:any):Observable<any>{
  return this.http.put(this.apcofg.lawyerReg + 'AddBlogAllDetailes/' + id,data);
}
getFaqs():Observable<any>{
  return this.http.get(this.apcofg.lawyerReg+'AllFaqs')
}
getSingleNotes(id:any):Observable<any>{
  return this.http.get(this.apcofg.lawyerReg+'CaseCommentDetailes/'+ id)
}

updateNotes(id:any,data:any):Observable<any>{
  return this.http.put(this.apcofg.lawyerReg+'CaseCommentDetailes/'+ id, data)
}
deleteNotes(id:any):Observable<any>{
  return this.http.delete(this.apcofg.lawyerReg+'CaseCommentDetailes/'+ id)
}
lawywerDashboard():Observable<any>{
  return this.http.get(this.apcofg.lawyerReg+'LawyerCasesAndTotalEarningandThisMonthEarning')
}


addBankDetials(data:any):Observable<any>{
  return this.http.post(this.apcofg.lawyerReg+'BankDetailsAdvocateList',data)
}

getBankDetials():Observable<any>{
  return this.http.get(this.apcofg.lawyerReg+'BankDetailsAdvocateList')
}


editBanlDetials(data:any):Observable<any>{
  return this.http.put(this.apcofg.lawyerReg+'BankDetailsAdvocateDetailes',data)
}

}
