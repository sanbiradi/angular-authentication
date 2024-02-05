import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpclient: HttpClient) { }

  setheader(token: string) {
    let header = new HttpHeaders({ ['Authorization']: 'Bearer ' + token });
    return header;
  }

  creat(token: string, payload: any) {
    return this.httpclient.post<any>('https://shop-api.ngminds.com/shop/orders', payload, { headers: this.setheader(token) })
  }

  pay(token: string, payload: any, id: string) {
    return this.httpclient.put<any>(`https://shop-api.ngminds.com/shop/orders/confirm/${id}`, payload, { headers: this.setheader(token) })
  }

  login = new BehaviorSubject<boolean>(false);
}
