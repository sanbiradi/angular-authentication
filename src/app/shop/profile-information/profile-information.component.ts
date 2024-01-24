import { Component } from '@angular/core';
import { StorageHandlerService } from '../services/storage-handler/storage-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.scss']
})
export class ProfileInformationComponent {
  constructor(private router: Router, private shopStorage: StorageHandlerService) {

  }
  logoutCustomer() {
    if (this.shopStorage.get("userLogined")) {
      this.shopStorage.remove("userLogined")
      this.router.navigate(['customer/login']);
    }
  }
}
