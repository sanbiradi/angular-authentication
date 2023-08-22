import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpService } from '../http.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  myerror!: any;
  baseUrl = `https://shop-api.ngminds.com`;
  constructor(private authService: AuthService, private router: Router, private httpService: HttpService, private storageService: StorageService) { }
  ngOnInit(): void { }
  login() {


    if (this.email && this.password) {
      let Loginurl = `${this.baseUrl}/auth/login?captcha=false`;
      let body = {
        email: this.email,
        password: this.password,
      };

      this.httpService.postFetch(Loginurl, body).subscribe((data: any) => {
        let newdata = this.authService.convertIntoJsObject(data);
        this.storageService.set('u', newdata.token);
        this.router.navigate(['/']);
      }, error => {
        // console.log(error);
        this.myerror = error;
      });
    } else {
      this.myerror = 'Email and password is required';
    }

  }
}
