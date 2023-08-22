import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpService } from '../http.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  fullName: string = '';
  companyName: string = '';
  role: string = '';
  isEmailVerified: boolean = true;
  myerrors?: any;

  baseUrl = `https://shop-api.ngminds.com`;

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router, private httpService: HttpService) { }

  onSubmit(): any {

    if (this.email &&
      this.password &&
      this.fullName &&
      this.companyName) {
      let registerUrl = `${this.baseUrl}/auth/register?captcha=false`;
      // add new user to local storage

      const body = {
        email: this.email,
        password: this.password,
        name: this.fullName,
        company: this.companyName,
      };

      let postFetch = this.httpService
        .postFetch(registerUrl, body)
        .subscribe((data) => {
          let newdata = this.authService.convertIntoJsObject(data);
          if (newdata.token) {
            this.storageService.set('u', newdata.token);
            return true;
          } else {
            return false;
          }
        }, error => {
          this.myerrors = error;
        });
    } else {
      this.myerrors = 'All fields are required!'
    }

  }
}
