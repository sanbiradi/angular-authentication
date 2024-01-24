import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

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
    private router: Router
  ) { }
  baseUrl = `https://shop-api.ngminds.com`;
  
  isLoggedIn(): boolean {
    // check if user is logged in by checking local storage
    if (localStorage.getItem('u')) {
      return true
    }
    return false;
  }

  hideCaptcha() {


  }


  convertIntoJsObject(data: any) {
    data = JSON.stringify(data);
    return JSON.parse(data);
  }

  logout(): boolean {
    // remove current user from local storage
    localStorage.removeItem('u');
    this.router.navigate(["/login"])
    return true;
  }



  public userdata: any;
  getCurrentUser(): any {
    // get current user from local storage
    let profileUrl = `${this.baseUrl}/auth/self`;
    let userToken = this.getCurrentToken();
    let tempdata;
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


  deleteUser(id: any): any {
    let token = this.getCurrentToken();
    let url = `${this.baseUrl}/users/${id}`;
    // console.log(id, url, token);
    this.httpService.deleteRequest(url, token).subscribe(response => {
      this.router.navigate(["/login"]);
      this.router.navigate(["/manage-user"]);
    }, error => {
      // console.log(error)
    });
  }




}
