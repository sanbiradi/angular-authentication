import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private toastr:ToastrService,private httpService: HttpService, private authService: AuthService) {

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
        // this.message = `Your password successfully changed.`;
        // this.type = true;
        this.toastr.success("",`Your password successfully changed.`,{
          timeOut:3000
        })
        
      },error=>{
        this.toastr.error("",error,{
          timeOut:3000
        })
      })

    } else {
      this.message = `Confirm password does not matched! `;
      this.type = false;
    }


  }
}
