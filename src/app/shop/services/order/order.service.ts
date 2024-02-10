import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  BASE_URL = 'https://shop-api.ngminds.com';
  constructor(private http: HttpClient) { }
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
    return throwError(errorMessage);
  }


  getLocalStorageToken(){
    let userLogined: any = localStorage.getItem("userLogined");
    if (!userLogined) {
      return throwError("User token not found");
    }
    return JSON.parse(userLogined);
  }

  



  //manage orders
  public getCustomersOrders(params: any):Observable<any>{
    let token =  this.getLocalStorageToken();
    // Set up the HTTP headers with the token
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`, // Use the retrieved token directly
      }),
      params: params
    };

    let url = `${this.BASE_URL}/shop/orders`;

    // Make the HTTP GET request
    return this.http.get<any>(url, options).pipe(
      catchError(this.handleError)
    );
  }


  public getCustomerOrderDetails(id:any):Observable<any>{
    let token =  this.getLocalStorageToken();
    
    // Set up the HTTP headers with the token
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`, // Use the retrieved token directly
      })
    };

    let url = `${this.BASE_URL}/shop/orders/${id}`;

    // Make the HTTP GET request
    return this.http.get<any>(url, options).pipe(
      catchError(this.handleError)
    );
  }
  public cancelOrderRequest(id: any): Observable<any> {
    let token = this.getLocalStorageToken();

    // Set up the HTTP headers with the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Combine headers with options
    const options = { headers: headers };

    console.log(options.headers);
    let url = `${this.BASE_URL}/shop/orders/cancel/${id}`;

    // Make the HTTP PATCH request with proper headers
    return this.http.patch<any>(url, null, options).pipe(
      catchError(this.handleError)
    );
  }
}


