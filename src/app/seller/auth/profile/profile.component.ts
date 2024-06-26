import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';
import { ToastrService } from 'ngx-toastr';
// import { ReCaptchaV3Service } from 'ngx-captcha';

@Component({
  selector: 'app-my-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user?: any;

  checkLogin?: boolean = false;
  u: any;
  token?: string = '';



  // update company profile
  email: string = '';
  password: string = '';
  fullName: string = '';
  companyName: string = '';
  role: string = '';
  isEmailVerified: boolean = true;
  myerror: any;


  constructor(private toastr: ToastrService, private authService: AuthService, private router: Router, private httpService: HttpService) {
    this.fetchData();
  }
  // toggle class
  isActive?: boolean = true;
  toggleClass() {
    this.isActive = !this.isActive;
  }

  baseUrl = `https://shop-api.ngminds.com`;

  onSubmit(): any {
    let userToken = this.authService.getCurrentToken();
    let url = `${this.baseUrl}/users/org`;
    let body = {
      "email": this.user.email,
      "name": this.user._org.name
    }

    this.httpService.updateCompanyInfo(url, userToken, body).subscribe(
      response => {
        this.isActive = true;
        this.toastr.success("", "Company information is updated successfully!", {
          timeOut: 3000
        })
      },
      error => {
        this.myerror = error;
        this.toastr.error("", error, {
          timeOut: 3000
        })
      }
    );

  }


  // profile informations fetching 
  fetchData() {
    setTimeout(() => {
      this.u = localStorage.getItem('u') || '';
      this.token = JSON.parse(this.u);
      if (this.token) {
        this.httpService
          .secureGet(`${this.baseUrl}/auth/self`, this.token)
          .subscribe((data) => {
            this.user = data;
          });
      }

    }, 1500);
  }


  logout() {
    if (this.authService.logout()) {
      this.router.navigate(['/login']);
    }
  }


}
