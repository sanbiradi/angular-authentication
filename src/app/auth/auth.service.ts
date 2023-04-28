import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './http.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor(
    private httpService: HttpService,
    private storageService: StorageService
  ) {}
  baseUrl = `https://shop-api.ngminds.com`;
  isLoggedIn(): boolean {
    // check if user is logged in by checking local storage
    if(localStorage.getItem('u')){
      return true
    }
    return false;
  }

  login(email: string, password: string) {
    let Loginurl = `${this.baseUrl}/auth/login?captcha=false`;

    let body = {
      email,
      password,
    };
    
    return this.httpService.postFetch(Loginurl, body).subscribe((data) => {
      let newdata = this.convertIntoJsObject(data);
      if (newdata.token) {
        this.storageService.set('u', newdata.token);
        return true;
      } else {
        return false;
      }
    });
  }

  convertIntoJsObject(data: any) {
    data = JSON.stringify(data);
    return JSON.parse(data);
  }

  logout(): boolean {
    // remove current user from local storage
    localStorage.removeItem('u');
    return true;
  }

  register(
    email: string,
    password: string,
    fullName: string,
    companyName: string
  ) {
    let registerUrl = `${this.baseUrl}/auth/register?captcha=false`;
    // add new user to local storage

    const body = {
      email,
      password,
      name: fullName,
      company: companyName,
    };

    let postFetch = this.httpService
      .postFetch(registerUrl, body)
      .subscribe((data) => {
        let newdata = this.convertIntoJsObject(data);
        if (newdata.token) {
          this.storageService.set('u', newdata.token);
          return true;
        } else {
          return false;
        }
      });
    
  }

  public userdata: any;
  getCurrentUser():any{
    // get current user from local storage
    let profileUrl = `${this.baseUrl}/auth/self`;
    let userToken = JSON.parse(localStorage.getItem('u') || ``);
    if (userToken) {
      this.httpService.secureGet(profileUrl, userToken).subscribe((data) => {
        this.userdata = data;
      });
    } else {
      return false;
    }
  }
}
