import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../store/product';
import { checkprice, decreaseqty, increaseqty, removeproduct } from '../store/cart.actions';
import { Observable, pluck } from 'rxjs';

import { CartService } from '../../services/cart/cart.service';
import { ShophttpService } from '../../services/shophttp/shophttp.service';
import { selectProductCount } from '../store/cart.selectors';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  constructor(private service: ShophttpService, private cartservice: CartService,
    private store: Store<{ cart: { product: Product[] } }>) { }

  outputproducts$: Observable<any> = this.store.select('cart').pipe(pluck('products'));
  storelogin: Observable<any> = this.store.select('cart').pipe(pluck('login'));
  address: any;

  productCount$ = this.store.select(selectProductCount);
  i = 0;
  id: any;
  loginflag!: boolean;
  userLogined: any = localStorage.getItem("userLogined");
  token = JSON.parse(this.userLogined);
  ngOnInit(): void {
    if (localStorage.getItem('userLogined')) {
      this.cartservice.login.next(true);  
    }
  
    this.cartservice.login.subscribe(res => {
      if(res==true){
        this.address = this.service.getAddresses();
      }
      this.loginflag = res;
    });
  }

  inc(id: string) {
    console.log(id);
    this.store.dispatch(increaseqty({ productId: id }));
    this.store.dispatch(checkprice());
    this.store.select('cart').subscribe(data => {
      localStorage.setItem('cart', JSON.stringify(data))
      console.log(data);
    });
  }

  dec(id: string, qty: number) {
    if (qty <= 1) {
      this.store.dispatch(removeproduct({ productId: id }));
      this.store.select('cart').subscribe(data => localStorage.setItem('cart', JSON.stringify(data)));
    }
    else {
      this.store.dispatch(decreaseqty({ productId: id }));
      this.store.dispatch(checkprice());
      this.store.select('cart').subscribe(data => {
        localStorage.setItem('cart', JSON.stringify(data));
        console.log(data);
      });
    }
  }
}
