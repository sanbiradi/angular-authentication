import { Component } from '@angular/core';
import { ShophttpService } from '../../services/shophttp/shophttp.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  message: any = false;
  type: any = false;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  constructor(private toastr:ToastrService,private shophttp: ShophttpService) {

  }
  resetPassword() {
    if (this.oldPassword && this.newPassword === this.confirmPassword) {
      this.shophttp.changePasswordRequest({ old_password: this.oldPassword, new_password: this.newPassword }).subscribe(data => {
        // this.message = 'Password has been changed successfully!';
        // this.type = true;
        this.toastr.success("Password has been changed successfully!","Success",{
          timeOut:3000
        })
        this.oldPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      }, error => {
       
        this.toastr.error(error,"Error",{
          timeOut:3000
        })
      })
    } else {
      // this.message = 'New password is not matched with confirm password!';
      // this.type = false;
      this.toastr.error("New password is not matched with confirm password!","Error",{
        timeOut:3000
      })
    }
  }
}
