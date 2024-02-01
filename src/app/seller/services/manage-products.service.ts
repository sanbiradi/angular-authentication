import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, filter, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class ManageProductsService {
  baseUrl = this.authService.baseUrl;
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
      errorMessage = `${error.error.message}`;
    } else {
       errorMessage = `${error.error.message}`;
    }
    return throwError(errorMessage);
  }

  
  createProduct(body: any): Observable<any> {
    let url = `${this.baseUrl}/products`;
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
      })
    };
    return this.http.post<any>(url, body, options).pipe(
      catchError(this.handleError)
    );
  }

  showSweetAlert(message:string): Promise<boolean> {
    return Swal.fire({
      title: 'Are you sure?',
      text: `${message}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  getProducts(filters: any): Observable<any> {
    const params = new HttpParams({ fromObject: filters });
    let url = `${this.baseUrl}/products`;
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      }),
      params
    };
   
    return this.http.get<any>(url, options).pipe(catchError(this.handleError));
  }

  deleteProduct(id: String): Observable<any> {
    let url = `${this.baseUrl}/products/${id}`;
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };
    return this.http.delete<any>(url, options).pipe(catchError(this.handleError));
  }

  getProductInfo(id: String): Observable<any> {
    let url = `${this.baseUrl}/products/${id}`;
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };
    return this.http.get<any>(url, options).pipe(catchError(this.handleError));
  }


  updateProductDetails(id:String,body:any):Observable<any>{
    let url = `${this.baseUrl}/products/${id}`;
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };
    return this.http.patch<any>(url,body,options).pipe(catchError(this.handleError));
  }

  updateProductImages(id:String,body:any):Observable<any>{
    let url = `${this.baseUrl}/products/images/${id}`;
    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    };
    return this.http.patch<any>(url,body,options).pipe(catchError(this.handleError));
  }
  
}
