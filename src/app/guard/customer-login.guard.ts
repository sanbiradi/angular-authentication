
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageHandlerService } from '../shop/services/storage-handler/storage-handler.service';


@Injectable({
  providedIn: 'root'
})
export class customerLoginGuard {
  constructor(private router: Router, private storage: StorageHandlerService) { }
  canActivate(): boolean {
    if (this.storage.checkUserLogined("userLogined")) {
      return true;
    } else {
      this.router.navigate(['customer/login']);
      return false;
    }
  }
}



