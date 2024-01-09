import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  oldpassword: string = '';
  newpassword: string = '';
  confirmpassword: string = '';
  message: any;
  type: any;

  constructor(private httpService: HttpService, private authService: AuthService) {

  }
  changepassword() {
    if (this.newpassword === this.confirmpassword) {

      let url = `${this.authService.baseUrl}/users/auth/change-password`;
      let body = {
        old_password: this.oldpassword,
        new_password: this.confirmpassword
      }
      let token = this.authService.getCurrentToken();

      this.httpService.createPostRequest(url, body, token).subscribe(data => {
        this.message = `Your password successfully changed.`;
        this.type = true;
        console.log(data);
      },error=>{
        this.message = error;
        this.type = false;
      })

    } else {
      this.message = `Confirm password does not matched! `;
      this.type = false;
    }


  }
}
