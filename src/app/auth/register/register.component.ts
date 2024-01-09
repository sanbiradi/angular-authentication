import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';
import { StorageService } from '../../services/storage.service';
import { ReCaptchaV3Service } from 'ngx-captcha';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {


  email: string = '';
  password: string = '';
  fullName: string = '';
  companyName: string = '';
  role: string = '';
  isEmailVerified: boolean = true;
  myerrors?: any;
  siteKey!: any;
  baseUrl = `https://shop-api.ngminds.com`;
  constructor(private authService: AuthService, private storageService: StorageService, private router: Router, private httpService: HttpService, private reCaptchaV3Service: ReCaptchaV3Service) {


  }
  ngOnInit(): void {
    this.siteKey = '6LevmbQZAAAAAMSCjcpJmuCr4eIgmjxEI7bvbmRI';
  }

  onSubmit(): any {

    this.reCaptchaV3Service.execute(this.siteKey, 'login', (token) => {
      let registerUrl = `${this.baseUrl}/auth/register`;

      const body = {
        email: this.email,
        password: this.password,
        name: this.fullName,
        company: this.companyName,
        captcha: token
      };
      
      this.httpService
        .postFetch(registerUrl, body)
        .subscribe((data) => {
          let newdata = this.authService.convertIntoJsObject(data);
          this.storageService.set('u', newdata.token);
          this.router.navigate(['/']);
        }, error => {
          this.myerrors = error;
        });

    }, {
      useGlobalDomain: false
    })

  }
}
