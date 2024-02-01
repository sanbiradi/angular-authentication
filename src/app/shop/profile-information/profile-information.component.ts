import { Component } from '@angular/core';
import { StorageHandlerService } from '../services/storage-handler/storage-handler.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.scss']
})
export class ProfileInformationComponent {
  
  
  constructor(private toastr:ToastrService,private router: Router, private shopStorage: StorageHandlerService) {
  }

  logoutCustomer() {
    if (this.shopStorage.get("userLogined")) {
      this.shopStorage.remove("userLogined")
      this.router.navigate(['/']);
      this.toastr.success("","You are logout successfully!",{
        timeOut:3000
      });
    }
  }

  
}
