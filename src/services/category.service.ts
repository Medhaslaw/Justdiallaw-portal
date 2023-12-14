import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { allCategoryInterFace, allCitesInterFace, allCourtsInterFace, allStatesInterFace } from 'src/pages/components/lawyer-info/models/category';
import { appconfig } from 'src/providers/appconfig';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(public appCofg: appconfig, public _http: HttpClient) { }
  listCategory(): Observable<allCategoryInterFace[]> {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    // });
    // const requestOptions = { headers: headers };
   return this._http.get<allCategoryInterFace[]>(this.appCofg.portalApp+'CategoryAllList').pipe(map( res => {
  return res
} ))
  }

  getStates():Observable<allStatesInterFace[]>{
    // const httpOptions = {headers: new HttpHeaders({
    //   'Content-Type': 'application/json'
    // })}
    return this._http.get<allStatesInterFace[]>( '/assets/json/states.json');
  }

  getCities(): Observable<allCitesInterFace[]>{
    // const httpOptions = {headers: new HttpHeaders({
    //   'Content-Type': 'application/json'
    // })}
    return this._http.get<allCitesInterFace[]>('../assets/json/cities.json');
  }
  getCourts(): Observable<allCourtsInterFace[]>{
    // const httpOptions = {headers: new HttpHeaders({
    //   'Content-Type': 'application/json'
    // })}
    return this._http.get<allCourtsInterFace[]>('../assets/json/courts.json');
  }
}
