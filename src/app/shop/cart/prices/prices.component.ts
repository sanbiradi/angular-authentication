import { Component, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, pluck } from 'rxjs';
import { Product } from '../store/product';
import { CartService } from '../../services/cart/cart.service';
import { emptycart } from '../store/cart.actions';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ShophttpService } from '../../services/shophttp/shophttp.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent implements OnInit {

  constructor(private customerservice: ShophttpService, private cartservice: CartService,
    private store: Store<{ cart: { product: Product[] } }>, private router: Router) { }

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });




  userLogined: any = localStorage.getItem("userLogined");
  token = JSON.parse(this.userLogined);
  storeproducts: Observable<any> = this.store.select('cart');
  storeprice: Observable<any> = this.store.select('cart').pipe(pluck('price'));
  storelogin: Observable<any> = this.store.select('cart').pipe(pluck('login'));

  deliveryFee = 99;
  flag = false;
  addressid: any = null;

  ngOnInit(): void {
    this.flag = localStorage.getItem('userLogined') ? true : false;
  }

  placeorder() {
    if (this.userLogined) {
      let payload = {
        items: [],
        deliveryFee: this.deliveryFee,
        total: 0,
        address: {}
      }

      document.querySelectorAll('input[name=listGroupRadio]').forEach((item: any) => {
        if (item.checked) {
          this.addressid = item.value;
        }
      });
      if (this.addressid) {
        this.storeproducts.subscribe(res => {
          payload.total = res?.price || 0;
          payload.items = res?.products || [];
        });
        this.customerservice.getAddresses().subscribe((data: any) => {
          console.log(data);
          const { _id, ...newaddress } = data!.at(this.addressid) || {};
          payload.address = newaddress;
          this.cartservice.creat(this.token, payload).subscribe(
            res => {
              // console.log(res);
              this.router.navigate(['shop', 'cart', 'confirm', res?.order?._id]);
              this.store.dispatch(emptycart());
              this.store.select('cart').subscribe(data => localStorage.setItem('cart', JSON.stringify(data)));
            },
            err => {
              console.log(err);
            }
          );
        });
      }
      else {
        this.Toast.fire({
          icon: 'error',
          title: 'Please select an address to proceed'
        })
      }
    }else{
      this.Toast.fire({
        icon: 'error',
        title: 'You need to logined to checkout your products!'
      })
    }
  }
}
