import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root',
})
export class HttpService {


  constructor(private http: HttpClient) {

  }

  //send a secure get request
  public secureGet(url: string, token: String): Observable<User> {
  
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', `Bearer ${token}`);
    return this.http.get<User>(url, { headers });
  }

  //send a request to a server
  public postFetch(url: string, body: Object): Observable<User> {
    return this.http.post<User>(url, body, { responseType: 'json' });
  }


  public createUserRequest(url: string, body: Object, token: any): Observable<User> | any {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      })
    };
    return this.http.post<User>(url, body,options)
  }

  public updateCompanyInfo(url: string, token: string, body: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      })
    };
    console.log('update company profile', url, token, body)
    return this.http.patch(url, body, options);

  }
  public deleteRequest(url:string,token:string):Observable<any>{
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      })
    };
    return this.http.delete(url,options);
  }



  updateUserInfo(url:any, body:any, token:any):Observable<any>{
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      })
    };
    return this.http.patch(url,body,options);
  }

}
