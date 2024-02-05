import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../seller/services/auth.service';
import { StorageHandlerService } from '../shop/services/storage-handler/storage-handler.service';
import { ShophttpService } from '../shop/services/shophttp/shophttp.service';
import { Store } from '@ngrx/store';
import { Product } from '../seller/products/product';
import { selectProductCount } from '../shop/cart/store/cart.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  @Input() userCheck?: String;
  LogIn?: boolean;

  productCount$ = this.store.select(selectProductCount);
  userLogined?: boolean;
  constructor(private store: Store, private authService: AuthService, private shopStorage: StorageHandlerService, private storageService: StorageHandlerService, private router: Router) {
    // this.LogIn = this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    this.LogIn = this.authService.isLoggedIn();
    // Hide reCAPTCHA badge after the component has been loaded
    this.userLogined = this.storageService.checkUserLogined("userLogined");   
  }

  logoutCustomer() {
    if (this.shopStorage.get("userLogined")) {
      this.userLogined = false;
      this.shopStorage.remove("userLogined")
      this.router.navigate(['customer/login']);
    }
  }
  logout() {
    if (this.authService.logout()) {
      this.LogIn = false;
      this.router.navigate(['/login']);
    }
  }
}
