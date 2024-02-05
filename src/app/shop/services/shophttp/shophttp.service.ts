import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import customer from '../../customer';

@Injectable({
  providedIn: 'root'
})
export class ShophttpService {

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

  public getAllProductsRequest(params: any): Observable<any> {
    let url = `${this.BASE_URL}/shop/products`;
    return this.http.get<any>(url, { params: params }).pipe(
      catchError(this.handleError)
    );
  }

  public registerCustomerRequest(payload: customer): Observable<any> {
    let url = `${this.BASE_URL}/shop/auth/register`;
    return this.http.post<any>(url, payload).pipe(catchError(this.handleError));
  }

  public loginCustomerRequest(payload: any): Observable<any> {
    let url = `${this.BASE_URL}/shop/auth/login`;
    return this.http.post<any>(url, payload).pipe(catchError(this.handleError));
  }


  public updateUserProfile(payload: any): Observable<any> {
    // Retrieve the token from localStorage directly
    let userLogined: any = localStorage.getItem("userLogined");
    let token = JSON.parse(userLogined);
    if (!userLogined) {
      // Handle the case where the token is not available
      // You may want to redirect to the login page or handle it as needed
      return throwError("User token not found");
    }

    // Set up the HTTP headers with the token
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`, // Use the retrieved token directly
      })
    };


    let url = `${this.BASE_URL}/customers/update-profile`;
    // Make the HTTP GET request
    return this.http.patch<any>(url, payload, options).pipe(
      catchError(this.handleError)
    );
  }


  public updateUserProfilePic(file: any): Observable<any> {
    // Retrieve the token from localStorage directly
    let userLogined: any = localStorage.getItem("userLogined");
    let token = JSON.parse(userLogined);
    if (!userLogined) {
      // Handle the case where the token is not available
      // You may want to redirect to the login page or handle it as needed
      return throwError("User token not found");
    }

    // Set up the HTTP headers with the token
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`, // Use the retrieved token directly
      })
    };


    let url = `${this.BASE_URL}/customers/profile-picture`;
    // Make the HTTP GET request
    return this.http.post<any>(url, file, options).pipe(
      catchError(this.handleError)
    );
  }


  public removeUserProfilePic(): Observable<any> {
    // Retrieve the token from localStorage directly
    let userLogined: any = localStorage.getItem("userLogined");
    let token = JSON.parse(userLogined);
    if (!userLogined) {
      // Handle the case where the token is not available
      // You may want to redirect to the login page or handle it as needed
      return throwError("User token not found");
    }

    // Set up the HTTP headers with the token
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`, // Use the retrieved token directly
      })
    };


    let url = `${this.BASE_URL}/customers/profile-picture`;
    // Make the HTTP GET request
    return this.http.delete<any>(url, options).pipe(
      catchError(this.handleError)
    );
  }



  public getUserDetails(): Observable<any> {
    // Retrieve the token from localStorage directly
    let userLogined: any = localStorage.getItem("userLogined");
    let token = JSON.parse(userLogined);
    if (!userLogined) {
      // Handle the case where the token is not available
      // You may want to redirect to the login page or handle it as needed
      return throwError("User token not found");
    }

    // Set up the HTTP headers with the token
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Use the retrieved token directly
      })
    };


    let url = `${this.BASE_URL}/shop/auth/self`;
    // Make the HTTP GET request
    return this.http.get<any>(url, options).pipe(
      catchError(this.handleError)
    );
  }




  // manage addresses
  public getAddresses(): Observable<any> {
    // Retrieve the token from localStorage directly
    let userLogined: any = localStorage.getItem("userLogined");
    let token = JSON.parse(userLogined);
    if (!userLogined) {
      // Handle the case where the token is not available
      // You may want to redirect to the login page or handle it as needed
      return throwError("User token not found");
    }

    // Set up the HTTP headers with the token
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`, // Use the retrieved token directly
      })
    };


    let url = `${this.BASE_URL}/customers/address`;
    // Make the HTTP GET request
    return this.http.get<any>(url, options).pipe(
      catchError(this.handleError)
    );
  }

  //add new address
  public addNewAddress(payload: any): Observable<any> {
    // Retrieve the token from localStorage directly
    let userLogined: any = localStorage.getItem("userLogined");
    let token = JSON.parse(userLogined);
    if (!userLogined) {
      // Handle the case where the token is not available
      // You may want to redirect to the login page or handle it as needed
      return throwError("User token not found");
    }

    // Set up the HTTP headers with the token
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Use the retrieved token directly
      })
    };


    let url = `${this.BASE_URL}/customers/address`;
    // Make the HTTP GET request
    return this.http.post<any>(url, payload, options).pipe(
      catchError(this.handleError)
    );
  }

  // delete address


  public deleteAddressRequest(id: any): Observable<any> {
    // Retrieve the token from localStorage directly
    let userLogined: any = localStorage.getItem("userLogined");
    let token = JSON.parse(userLogined);
    if (!userLogined) {
      // Handle the case where the token is not available
      // You may want to redirect to the login page or handle it as needed
      return throwError("User token not found");
    }

    // Set up the HTTP headers with the token
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`, // Use the retrieved token directly
      })
    };


    let url = `${this.BASE_URL}/customers/address/${id}`;
    // Make the HTTP GET request
    return this.http.delete<any>(url, options).pipe(
      catchError(this.handleError)
    );
  }




  // update address
  public udpateAddressRequest(payload: any, id: any): Observable<any> {
    // Retrieve the token from localStorage directly
    let userLogined: any = localStorage.getItem("userLogined");
    let token = JSON.parse(userLogined);
    if (!userLogined) {
      // Handle the case where the token is not available
      // You may want to redirect to the login page or handle it as needed
      return throwError("User token not found");
    }

    // Set up the HTTP headers with the token
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`, // Use the retrieved token directly
      })
    };


    let url = `${this.BASE_URL}/customers/address/${id}`;
    // Make the HTTP GET request
    return this.http.put<any>(url, payload, options).pipe(
      catchError(this.handleError)
    );
  }


  // change password

  public changePasswordRequest(payload: any): Observable<any> {
    // Retrieve the token from localStorage directly
    let userLogined: any = localStorage.getItem("userLogined");
    let token = JSON.parse(userLogined);
    if (!userLogined) {
      // Handle the case where the token is not available
      // You may want to redirect to the login page or handle it as needed
      return throwError("User token not found");
    }

    // Set up the HTTP headers with the token
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Use the retrieved token directly
      })
    };


    let url = `${this.BASE_URL}/customers/auth/change-password`;
    // Make the HTTP GET request
    return this.http.post<any>(url, payload, options).pipe(
      catchError(this.handleError)
    );
  }


  public deleteMyAccount(): Observable<any> {
    // Retrieve the token from localStorage directly
    let userLogined: any = localStorage.getItem("userLogined");
    let token = JSON.parse(userLogined);
    if (!userLogined) {
      // Handle the case where the token is not available
      // You may want to redirect to the login page or handle it as needed
      return throwError("User token not found");
    }

    // Set up the HTTP headers with the token
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`, // Use the retrieved token directly
      })
    };


    let url = `${this.BASE_URL}/customers/account`;
    // Make the HTTP GET request
    return this.http.delete<any>(url, options).pipe(
      catchError(this.handleError)
    );
  }


  public getSingleProduct(id: any): Observable<any> {
    let url = `${this.BASE_URL}/shop/products/${id}`;
    // Make the HTTP GET request
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }


  //manage orders
  public getCustomersOrders(){
    // Retrieve the token from localStorage directly
    let userLogined: any = localStorage.getItem("userLogined");
    let token = JSON.parse(userLogined);
    if (!userLogined) {
      // Handle the case where the token is not available
      // You may want to redirect to the login page or handle it as needed
      return throwError("User token not found");
    }

    // Set up the HTTP headers with the token
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`, // Use the retrieved token directly
      })
    };


    let url = `${this.BASE_URL}/shop/orders`;
    // Make the HTTP GET request
    return this.http.get<any>(url, options).pipe(
      catchError(this.handleError)
    );
  }
}
