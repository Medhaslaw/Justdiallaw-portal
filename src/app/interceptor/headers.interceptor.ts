import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpProgressEvent,
  HttpEventType,
  HttpResponse
} from '@angular/common/http';
import { catchError, concat, delay, elementAt, Observable, of, throwError } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

 const lawyerToken = localStorage.getItem('lawyer-token')
 const userToken = localStorage.getItem('user-token')

 if(lawyerToken){
  const cloned = request.clone({
    headers: request.headers.set('Authorization','Token '+ lawyerToken)
  })

  if(request.url === 'http://15.206.219.69/advocateapp/FilesForCleintToAdvocateList'){

 }

  return next.handle(cloned);
 } else if(userToken){
  const cloned = request.clone({
    headers: request.headers.set('Authorization','Token '+ userToken)
  })

  return next.handle(cloned);
 }   

 
request.headers.set('Content-Type','application/json')
request.headers.set('Content-Security-Policy','default-src')

    return next.handle(request).pipe(catchError( err  =>{
      console.log(err.status);
      console.log(err)
      if(err.status === 400) {
        console.log('The repeat this request without modification.')
      }
      else if(err.status === 401){
        console.log('Unauthorized User')
      }
      return throwError( err );
    }))

   


  }
}
