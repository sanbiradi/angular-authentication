import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpService } from '../http.service';
import { StorageService } from '../storage.service';
import { ReCaptchaV3Service } from 'ngx-captcha';

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
  captcha:any;
  constructor(private reCaptchaV3Service: ReCaptchaV3Service, private authService: AuthService, private router: Router, private httpService: HttpService, private storageService: StorageService) { }
  ngOnInit(): void {
    this.siteKey = '6LevmbQZAAAAAMSCjcpJmuCr4eIgmjxEI7bvbmRI';
  }
  login() {
  

    if (this.email && this.password) {
  
      this.reCaptchaV3Service.execute(this.siteKey, 'login', (token) => {
        
        let Loginurl = `${this.baseUrl}/auth/login`;
        let body = {
          email: this.email,
          password: this.password,
          captcha:token
        };
        this.httpService.postFetch(Loginurl, body).subscribe((data: any) => {
          let newdata = this.authService.convertIntoJsObject(data);
          this.storageService.set('u', newdata.token);
          this.router.navigate(['/']);
        }, error => {
          // console.log(error);
          this.myerror = error;
        });
      }, {
        useGlobalDomain: false
      });
    } else {
      this.myerror = 'Email and password is required';
    }

  }
}
