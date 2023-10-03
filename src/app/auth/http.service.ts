import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, pipe, throwError } from 'rxjs';
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
  public postFetch(url: string, body: Object): Observable<any> {
    return this.http.post<any>(url, body, { responseType: 'json' }).pipe(
      catchError(this.handleError)
    );
  }


  

  public resetPassword(url: string, token: string,body:Object): Observable<any> {
    return this.http.post<any>(url, body, { params: { token: token } }).pipe(
      catchError(this.handleError)
    );
  }

  public verifyAccount(url: string, token: string): Observable<any> {
    return this.http.post<any>(url, null, { params: { token: token } }).pipe(
      catchError(this.handleError)
    );
  }

  public postWithToken(url:string, token:string):Observable<any>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      })
    };
    return this.http.post<any>(url,null,options).pipe(
      catchError(this.handleError)
    )
  }
  //send a request to a server
  public postUrl(url: string): Observable<any> {
    return this.http.post<any>(url, { responseType: 'json' }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `${error.error.message}`;
    } else {
      // Server-side errors
      // errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
      errorMessage = `${error.error.message}`;
    }
    // You can customize how you display the error message here (e.g., using a toaster service)
    // You can also emit an event or update a variable to display the error in a component.
    // console.log(errorMessage);
    return throwError(errorMessage);
  }



  public createUserRequest(url: string, body: Object, token: any): Observable<User> | any {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      })
    };
    return this.http.post<User>(url, body, options).pipe(
      catchError(this.handleError)
    );
  }


  public createPostRequest(url: string, body: Object, token: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      }
      ), Credential: true
    };
    console.log(options)
    return this.http.post<any>(url, body, options).pipe(
      catchError(this.handleError)
    );
  }

  public updateCompanyInfo(url: string, token: string, body: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      })
    };
    // console.log('update company profile', url, token, body)
    return this.http.patch(url, body, options).pipe(catchError(this.handleError));

  }

  public deleteRequest(url: string, token: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      })
    };
    return this.http.delete(url, options);
  }

  updateUserInfo(url: any, body: any, token: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      })
    };
    return this.http.patch(url, body, options).pipe(catchError(this.handleError));
  }


}
