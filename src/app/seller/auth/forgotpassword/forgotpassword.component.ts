import { Component } from '@angular/core';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {

  email!: string;
  siteKey!: string;
  message!: string;
  type!: boolean;
  baseUrl = `https://shop-api.ngminds.com`;
  captcha: any;
  visible: boolean = false;

  constructor(private toastr: ToastrService, private reCaptchaV3Service: ReCaptchaV3Service, private authService: AuthService, private router: Router, private httpService: HttpService) {
  }
  ngOnInit(): void {
    this.siteKey = '6LevmbQZAAAAAMSCjcpJmuCr4eIgmjxEI7bvbmRI';
  }
  forgetpassword() {
    if (this.email) {
      this.reCaptchaV3Service.execute(this.siteKey, 'login', (token) => {

        let forgetpasswordUrl = `${this.baseUrl}/auth/forgot-password`;
        
        let body = {
          email: this.email,
          captcha: token
        }

        this.httpService.postFetch(forgetpasswordUrl, body).subscribe((data) => {
          this.message = data;
          this.type = false;
          this.toastr.success("", data, {
            timeOut: 3000
          });
          this.visible = true
        }, error => {
          this.message = error;
          this.type = false;
          this.toastr.error("",error,{
            timeOut:3000
          })
        })

      });
    }
  }


}
