import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpService } from '../http.service';
import { StorageService } from '../storage.service';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

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

  constructor(private gauthService: SocialAuthService, private reCaptchaV3Service: ReCaptchaV3Service, private authService: AuthService, private router: Router, private httpService: HttpService, private storageService: StorageService) {

  }
  ngOnInit(): void {
    this.siteKey = '6LevmbQZAAAAAMSCjcpJmuCr4eIgmjxEI7bvbmRI';
    this.reCaptchaV3Service.execute(this.siteKey, 'login', (token) => {
      this.captcha = token;
    });

    this.gauthService.authState.subscribe((user) => {
      console.log(this.user)
      this.user = user;
      let url = `${this.authService.baseUrl}/auth/login/google`;
      let body = {
        token: this.user.idToken,
        captcha: this.captcha
      }
      if(this.captcha){
        this.httpService.postFetch(url, body).subscribe(data => {
          let newdata = this.authService.convertIntoJsObject(data);
          this.storageService.set('u', newdata.token);
          this.router.navigate(['/']);
          this.dom.style.display = 'none';
          this.dom.style.visibility = 'hidden'
        }, error => {
          this.myerror = error;
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
        this.router.navigate(['/']);
        this.dom.style.display = 'none';
        this.dom.style.visibility = 'hidden'
      }, error => {
        // console.log(error);
        this.myerror = error;
      });

    } else {
      this.myerror = 'Email and password is required';
    }

  }
}
