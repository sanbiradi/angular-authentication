import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpService } from 'src/app/auth/http.service';

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
  hide!: any

  constructor(private httpService: HttpService, private authService:AuthService) {

  }
  closeAlert() {
    setTimeout(() => {
      this.hide = true;
    }, 2000);
  }

  changepassword() {
    if (this.oldpassword && this.newpassword && this.confirmpassword) {
      console.log(this.oldpassword, this.newpassword, this.confirmpassword)
      if (this.newpassword == this.confirmpassword) {
        let body = {
          old_password: this.oldpassword,
          new_password: this.newpassword
        }
        let url = `${this.authService.baseUrl}/auth/change-password`;
        let token = this.authService.getCurrentToken();

        this.httpService.createPostRequest(url,body,token).subscribe((data:any)=>{
          console.log(data,url);
        },(error: any)=>{
          console.log(error);
          this.message = error;
          this.type = false;
        });
        
      } else {
        this.message = 'New password did not matched!';
        this.type = false;
      }
    } else {
      this.message = 'All information is required';
      this.type = false;
    }
  }
}
