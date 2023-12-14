import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { BehaviorSubject, Observable, filter, pairwise } from 'rxjs';
import { LawyerData } from 'src/pages/components/lawyer-info/models/lawyer.interface';
import { appconfig } from 'src/providers/appconfig';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  // public previousRoutePath = new BehaviorSubject<string>('');

  previousUrl!: string;
 currentUrl!: string ;


  constructor(public baseUrl: appconfig, public http: HttpClient,private router: Router,
    public location: Location) { 
      // this.previousRoutePath.next(this.location.path());

      // this.router.events.pipe(
      //   filter(e => e instanceof RoutesRecognized),
      //   pairwise(),
      //     )
      // .subscribe((event: any[]) => {
      //     this.previousRoutePath.next(event[0].urlAfterRedirects);
      // });
  
    
      this.currentUrl = this.router.url;
      router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.previousUrl = this.currentUrl;
          this.currentUrl = event.url;
        };
      });



  }

 
   getPreviousUrl(){
    return this.previousUrl;
  }  

  getAllDates(advocateId:any): Observable<any> {
  
    return this.http.get(this.baseUrl.portalApp + 'DatesGetTodayToAfterThirtydays?advocate_id='+advocateId)
  }
  lawyerDet(id: any):Observable<LawyerData[]> {
   
    return this.http.get<LawyerData[]>(this.baseUrl.portalApp + 'LawyerAllData/' + id,)
  }

  nearBySearch(reqObj:any):Observable<LawyerData[]>{
    return this.http.get<LawyerData[]>(this.baseUrl.portalApp + 'SearchLawyerAllDataget?category_id='+reqObj.category+'&szc='+reqObj.location + '&language='+reqObj.language + '&latitude='+reqObj.latitude +
    '&logitude='+ reqObj.longitude)
  }

  getAllBlogsList():Observable<any>{
   
 return this.http.get(this.baseUrl.portalApp+'allblogsdata')
  }

  blogSingleGet(blogId:any):Observable<any>{
  
    return this.http.get(this.baseUrl.portalApp+'SingleBlogDetails?blog_id='+blogId)
  }


  lawyerBlogs(lawyer_id:any):Observable<any>{
   return this.http.get(this.baseUrl.portalApp+'blogdatabasedonadvocateid?user_id='+lawyer_id)
  }


  allBlockedSlots(lawyer_id:any,date:any):Observable<any>{
    return this.http.get(this.baseUrl.portalApp+'AllAppointmentListofCancelldSlots?advocate_id='+lawyer_id+'&date='+date)
  }

  
  vactionDate(lawer_id:any,date:any):Observable<any>{
     return this.http.get(this.baseUrl.portalApp+'AdvocateLeaveAreAvailable?date='+date+'&advocate_id='+lawer_id)
  }

  top_lawyers():Observable<any>{
     return this.http.get(this.baseUrl.portalApp+'TopLawyerGet')
  }

  admineAllBlogs():Observable<any>{
    return this.http.get(this.baseUrl.portalApp+'AllBlogsGetStatusTrue')
  }

  viewsCount(blog_id:any):Observable<any>{
    return this.http.put(this.baseUrl.portalApp+'ViewsCountParticularBlog',blog_id)
  }

  top_AdminBlogs():Observable<any>{
     return this.http.get(this.baseUrl.portalApp+'GetTopAdminblogs')
  }

  enquirysPost(data:any):Observable<any>{
    return this.http.post(this.baseUrl.portalApp+'EnquiryList',data)
  }


  categoryBasadeLawyerList(cat_id:any):Observable<any>{
    return this.http.get(this.baseUrl.portalApp+'CategorybasedLawyers?category_id='+cat_id)
  }
  
lawyerAllArtical(artical_id:any):Observable<any>{
return this.http.get(this.baseUrl.portalApp+'SingleArticlesDetails?article_id='+artical_id)
}

}


