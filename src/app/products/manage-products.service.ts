import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Product } from './product';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ManageProductsService {
  baseUrl = 'https://shop-api.ngminds.com';
  token!: String;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = this.authService.getCurrentToken();
  }

  ngOnInit() {
    this.token = this.authService.getCurrentToken();
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `${error.error.message}`;
    } else {
      // Server-side errors
      // errorMessage =:50:34 `Error Code: ${error.status}\nMessage: ${error.error.message}`;
      errorMessage = `${error.error.message}`;
    }
    // You can customize how you display the error message here (e.g., using a toaster service)
    // You can also emit an event or update a variable to display the error in a component.
    // console.log(errorMessage);
    return throwError(errorMessage);
  }

  createProduct(body: any): Observable<any> {
    let url = `${this.baseUrl}/products`;
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
      })
    };
    console.log(url,options,body);
    return this.http.post<any>(url, body, options).pipe(
      catchError(this.handleError)
    );
  }

  getProducts(filters:any): Observable<any> {
    
    let url = `${this.baseUrl}/products`;

    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<[]>(url, options).pipe(catchError(this.handleError))
  }


}
