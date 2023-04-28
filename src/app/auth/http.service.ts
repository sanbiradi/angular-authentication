import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root',
})
export class HttpService{
  

  constructor(private http: HttpClient) {

  }



  //send a secure get request
  public secureGet(url: string, token: String):Observable<User>{
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', `Bearer ${token}`);
    return this.http.get<User>(url, { headers });
  }



  //send a request to a server
  public postFetch(url: string, body: Object):Observable<User>{
    return this.http.post<User>(url, body, { responseType: 'json' });
  }
}
