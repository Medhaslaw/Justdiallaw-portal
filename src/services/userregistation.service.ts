import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appconfig } from 'src/providers/appconfig';
import {  throwError, pipe, BehaviorSubject } from 'rxjs';
import { bookedTimeSlotsList, timeSlotsList } from 'src/pages/components/lawyer-info/models/dayslot.interface';
import { regInterFace, reviewInterFace, UserData } from 'src/pages/components/lawyer-info/models/user.interface';
import { withCache } from '@ngneat/cashew';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class UserregistationService {

  public lawyerData: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public userData: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public clintData: BehaviorSubject<string> = new BehaviorSubject<string>('')
  public servicedoc: BehaviorSubject<string> = new BehaviorSubject<string>('')

  public lawyerAllList: BehaviorSubject<string> = new BehaviorSubject<string>('')


  constructor(public baseUrl: appconfig, public http: HttpClient) { }


  userProfileData(data:any){
    this.userData.next(data)
  }

clintProfileData(data:any){
this.clintData.next(data)
}


laywerData(data:any){
  this.lawyerAllList.next(data)
}

subServiceDoc(data:any){
  this.servicedoc.next(data)
}


  // userreg(userData:any):Observable<regInterFace>{
  //   return this.http.post<regInterFace>(this.baseUrl.userRegistation +'UserReg', userData )
  // }

    userreg(userData:any):Observable<regInterFace>{
    return this.http.post<regInterFace>(this.baseUrl.userRegistation +'user_verification_send_password', userData )
  }
  otpVerification(data:any): Observable<any>{
    return this.http.post<any>(this.baseUrl.userRegistation + 'UserVerficationOtpCheck', data);
  }

  saveProfileData(data:any){
    this.lawyerData.next(data)
  }
  saveUserProfileData(data:any){
    this.userData.next(data)
  }


  loginData(req: any): Observable<UserData[]> {
    return this.http.post<UserData[]>(this.baseUrl.userLogin + 'UserLogin', req)
  }


  allTimeSlots(lawyerId:any,date:any): Observable<timeSlotsList[]> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //   })
    // };
    return this.http.get<timeSlotsList[]>(this.baseUrl.portalApp + 'AdvocateAllCreatedslotsforuser?advocate_id='+lawyerId+'&date='+date)
  }


  lawyerTotalTimeSlots(lawyerId:any,date:any):Observable<any>{
    return this.http.get(this.baseUrl.portalApp+'AllbookedBlockedandAvailableandvacotion?advocate_id='+lawyerId+'&date='+date)
  }



  appointmetDetails(id: any,): Observable<any> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Token ' + localStorage.getItem('user-token'),
    //   })
    // };
    return this.http.get<bookedTimeSlotsList>(this.baseUrl.portalApp + 'GetUserandAdvocatedataBasedonappointment?appointment_id=' + id)
  }

  bookingTimeSlots(data: any): Observable<bookedTimeSlotsList[]> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Token ' + localStorage.getItem('user-token'),
    //   })
    // };
    return this.http.post<bookedTimeSlotsList[]>(this.baseUrl.userLogin + 'UserAppointmentBooking', data)
  }

  bookedSlots(id: any, date: any,): Observable<bookedTimeSlotsList[]> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //   })
    // };
    return this.http.get<bookedTimeSlotsList[]>(this.baseUrl.portalApp + 'AdvocatebookedAndUnBookedSlots?advocate_id='+id+'&date='+date)
    
  }


  profileUpload(imgFile: any): Observable<UserData[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('user-token'),
      })
    };
    return this.http.put<UserData[]>(this.baseUrl.userLogin + 'Userimageedit', imgFile,httpOptions)
  }

userUpdate(userData:any): Observable<UserData[]>{
  const httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('user-token'),
    })
  };
  return this.http.put<UserData[]>(this.baseUrl.userLogin + 'UserProfilEdit',userData,httpOptions)
}


userAppoinment(): Observable<bookedTimeSlotsList[]>{
  const httpOptions = {headers: new HttpHeaders({
    'Authorization': 'Token '+ localStorage.getItem('user-token'),
    // 'Content-Type': 'application/json',
  })}
  return this.http.get<bookedTimeSlotsList[]>(this.baseUrl.userLogin + 'AppointmentsBasedonClient', httpOptions)
}
reviewPost(data:any): Observable<reviewInterFace[]>{
  const httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('user-token'),
    })
  };
  return this.http.post<reviewInterFace[]>(this.baseUrl.userLogin + 'ReviewsList',data,httpOptions)

}

getProfileDetails():Observable<UserData[]>{
  const httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('user-token'),
    })
  };

  return this.http.get<UserData[]>(this.baseUrl.portalApp + 'AllProfileGet',httpOptions);

}

userProfileUpdate(imgFile: any): Observable<UserData> {
  // const httpOptions = {
  //   headers: new HttpHeaders({
  //     // 'Content-Type': 'application/json',
  //     'Authorization': 'Token ' + localStorage.getItem('user-token'),
  //   })
  // };
  return this.http.put<UserData>(this.baseUrl.userLogin + 'Userimageedit', imgFile)
}

sendingMails(clienMail:any,lawyerMail:any,timeSlot:any,date:any){
  // const httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     // 'Authorization': 'Token ' + localStorage.getItem('user-token'),
  //   })
  // };
  return this.http.get(this.baseUrl.userLogin+'SendingMailafterbookingAppoint?date='+date+'&timeslot='+timeSlot+'&Advovate_id='+lawyerMail+'&user_id='+clienMail,)
}

userForGotPsw(data:any){
  // const httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     // 'Authorization': 'Token ' + localStorage.getItem('user-token'),
  //   })
  // }

  return this.http.post(this.baseUrl.userLogin+'User_Forgotpassword',data)

}

userVerifyOtp(data:any){
  // const httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     // 'Authorization': 'Token ' + localStorage.getItem('user-token'),
  //   })
  // }
  return this.http.post(this.baseUrl.userLogin+'User_OtpCheck',data)
}

userResetPsw(data:any){

  // const httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     // 'Authorization': 'Token ' + localStorage.getItem('user-token'),
  //   })
  // }
return this.http.post(this.baseUrl.userLogin+'UserPasswordChange',data)
}

acceptsCase(accCase:any,userId:any):Observable<any>{
return this.http.get(this.baseUrl.userLogin+'AcceptorRejectRcords?accepts_or_rejects='+accCase+'&client_id='+userId)
}

appomentsTimelines(app_id:any):Observable<any>{
  return this.http.get(this.baseUrl.userLogin+'AllDetailsCaseBasedOnAppointmentId?appointment_id='+app_id)
}

dashBoradUserCounts():Observable<any>{
  return this.http.get(this.baseUrl.userLogin+'DashboradUserCounts')
}

allMeetings():Observable<any>{
  return this.http.get(this.baseUrl.userLogin+'AllCasesBasedOnUser')
}

allFeedback():Observable<any>{
  return this.http.get(this.baseUrl.userLogin+'FeedbackList')
}

addFeedback(data:any):Observable<any>{
  return this.http.post(this.baseUrl.userLogin+'FeedbackList',data)
}

meetingNotes(data:any):Observable<any>{
return this.http.post(this.baseUrl.userLogin+'CaseCommentList',data)
}

allMeetingNotes(app_Id:any):Observable<any>{
  return this.http.get(this.baseUrl.userLogin+'AllCaseCommentBasedonAppoinmentid?appointment_id='+app_Id)
}

allOnlineAppoinments(app_Id:any):Observable<any>{
  return this.http.get(this.baseUrl.userLogin+'AllMeetingsBasedonAppointmentid?appointment_id='+app_Id)
}

userAddFile(data:any):Observable<any>{
  return this.http.post(this.baseUrl.userLogin+'FilesForCleintToAdvocateList',data)
}

allFilesGet(app_Id:any):Observable<any>{
  return this.http.get(this.baseUrl.userLogin+'FilesForCleintToAdvocateList?appointment_id='+app_Id)
}

viewFile(file_id:any):Observable<any>{
return this.http.get(this.baseUrl.userLogin+'FilesRecordGetBasedOnId?file_id='+file_id)
}

deleteFile(file_id:any):Observable<any>{
  return this.http.delete(this.baseUrl.userLogin+'DeleteFilesBasedOnCreator?file_id='+file_id)
}


appointmentData(app_Id:any):Observable<any>{
  return this.http.get(this.baseUrl.userLogin+'AppointmentDetailsBasedOnAppontmentID?appointment_id='+app_Id)
}

userPaymentsList():Observable<any>{
  return this.http.get(this.baseUrl.userLogin+'UserAllPaymentRecords')
}

notesSingleGet(id:any):Observable<any>{
  return this.http.get(this.baseUrl.userLogin+'CaseCommentDetailesUser/' + id)
}
notesUpdate(id:any, data:any):Observable<any>{
  return this.http.put(this.baseUrl.userLogin+'CaseCommentDetailesUser/' + id, data,)
}
notesDelete(id:any):Observable<any>{
  return this.http.delete(this.baseUrl.userLogin+'CaseCommentDetailesUser/' + id)
}
}



