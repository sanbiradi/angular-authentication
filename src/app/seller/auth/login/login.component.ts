import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';
import { StorageService } from '../../services/storage.service';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  
  
  email: string = '';
  password: string = '';
  myerror!: any;
  siteKey: any;
  baseUrl = `https://shop-api.ngminds.com`;
  captcha: any;
  user!: SocialUser;
  dom = document.querySelector('.grecaptcha-badge') as HTMLElement;
  loggedIn!: boolean;

  constructor(private toastr:ToastrService,private gauthService: SocialAuthService, private reCaptchaV3Service: ReCaptchaV3Service, private authService: AuthService, private router: Router, private httpService: HttpService, private storageService: StorageService) {

  }


  ngOnInit(): void {
    this.siteKey = '6LevmbQZAAAAAMSCjcpJmuCr4eIgmjxEI7bvbmRI';
    if (this.siteKey)
      this.reCaptchaV3Service.execute(this.siteKey, 'login', (token) => {
        this.captcha = token;
    
      });

    if (this.siteKey)
      this.gauthService.authState.subscribe((user) => {
        
        this.user = user;
        let url = `${this.authService.baseUrl}/auth/login/google`;
        let body = {
          token: this.user.idToken,
          captcha: this.captcha
        }
        if (this.captcha) {
          this.httpService.postFetch(url, body).subscribe(data => {
            let newdata = this.authService.convertIntoJsObject(data);
            this.storageService.set('u', newdata.token);
            this.router.navigate(['/products']);
            this.dom.style.display = 'none';
            this.dom.style.visibility = 'hidden';
            this.toastr.success("","You are logined successfully!",{
              timeOut:3000
            });
          }, error => {
            this.myerror = error;
            this.toastr.error("",error,{
              timeOut:3000
            });
          })
        }
      });


  }
  login() {
    if (this.email && this.password) {
      let Loginurl = `${this.baseUrl}/auth/login`;
      let body = {
        email: this.email,
        password: this.password,
        captcha: this.captcha
      };

      this.httpService.postFetch(Loginurl, body).subscribe((data: any) => {
        let newdata = this.authService.convertIntoJsObject(data);
        this.storageService.set('u', newdata.token);
        // console.log(newdata);
        this.router.navigate(['/products']);
        if (this.dom) {
          this.dom.style.display = 'none';
          this.dom.style.visibility = 'hidden'
        }
        this.toastr.success("","You are logined successfully!",{
          timeOut:3000
        });
      }, error => {
        // console.log(error);
        this.toastr.error("",error,{
          timeOut:3000
        });
        this.myerror = error;
      });
    } else {
      this.myerror = 'Email and password is required';
    }

  }
}
