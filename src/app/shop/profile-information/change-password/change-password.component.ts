import { Component } from '@angular/core';
import { ShophttpService } from '../../services/shophttp/shophttp.service';

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
  constructor(private shophttp: ShophttpService) {

  }
  resetPassword() {
    if (this.oldPassword && this.newPassword === this.confirmPassword) {
      this.shophttp.changePasswordRequest({ old_password: this.oldPassword, new_password: this.newPassword }).subscribe(data => {
        this.message = 'Password has been changed successfully!';
        this.type = true;
        
        this.oldPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      }, error => {
        this.message = error;
        this.type = false;
      })
    } else {
      this.message = 'New password is not matched with confirm password!';
      this.type = false;
    }
  }
}
