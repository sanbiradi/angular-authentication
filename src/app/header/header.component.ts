import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../seller/services/auth.service';
import { StorageHandlerService } from '../shop/services/storage-handler/storage-handler.service';
import { ShophttpService } from '../shop/services/shophttp/shophttp.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
 

  @Input() userCheck?:String;
  LogIn?:boolean;

  userLogined?:boolean;
  constructor(private authService: AuthService,private shopStorage:StorageHandlerService,private storageService:StorageHandlerService, private router: Router) {
    // this.LogIn = this.authService.isLoggedIn();
  }
  
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.LogIn = this.authService.isLoggedIn();     
    // Hide reCAPTCHA badge after the component has been loaded
    this.userLogined = this.storageService.checkUserLogined("userLogined");
  }
 
  logoutCustomer(){
    if (this.shopStorage.get("userLogined")){
      this.userLogined= false;
      this.shopStorage.remove("userLogined")
      this.router.navigate(['customer/login']);
    }
  }
  logout() {
    if (this.authService.logout()){
      this.LogIn= false;
      this.router.navigate(['/login']);
    }
  }
}
