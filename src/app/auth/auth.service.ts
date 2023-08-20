import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router:Router
  ) { }
  baseUrl = `https://shop-api.ngminds.com`;
  isLoggedIn(): boolean {
    // check if user is logged in by checking local storage
    if (localStorage.getItem('u')) {
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
  getCurrentUser(): any {
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

  getCurrentToken(): any {
    // get current user from local storage
    let userToken = JSON.parse(localStorage.getItem('u') || ``);
    if (userToken) {
      return userToken;
    } else {
      return false;
    }
  }

  updateProfile(userData: any): any {
    let userToken = this.getCurrentToken();
    let url = `${this.baseUrl}/users/org`;
    let body = {
      "email": userData.email,
      "name": userData._org.name
    }
    console.log(userData, body);
    this.httpService.updateCompanyInfo(url, userToken, body).subscribe(
      response => {
        // Handle successful response
        console.log('Profile updated successfully:', response);
      },
      error => {
        // Handle error
        console.error('Error updating profile:', error);
      }
    );
  }

  deleteUser(id: any): any {
    let token = this.getCurrentToken();
    let url = `${this.baseUrl}/users/${id}`;
    console.log(id, url, token);
    this.httpService.deleteRequest(url, token).subscribe(response => {
      console.log("user has been deleted!", response)
      this.router.navigate(["/manage-user"]);
    }, error => {
      console.log(error)
    });
  }




  // create User
  createUser(userInfo: any) {
    let url = `${this.baseUrl}/users`;
    console.log("api call")
    let token = this.getCurrentToken();
    this.httpService.createUserRequest(url, userInfo, token).subscribe((response: any) => {
      console.log("user has been created!", response)
      this.router.navigate(["/manage-user"]);
    }, (error: any) => {
      console.log(error)
    });
  

  }


}
