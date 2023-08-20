import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpService } from 'src/app/auth/http.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user?: any;
  userD: any;
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
  validationerr?: boolean;


  // toggle class
  isActive?:boolean=true;
  toggleClass(){
    this.isActive = !this.isActive;
  }


  onSubmit(): void {
    // this.validationerr = Boolean(
    //   this.email && this.role && this.companyName
    // );
    this.authService.updateProfile(this.user);
   
  }

  baseUrl = `https://shop-api.ngminds.com`;
  constructor(
    private authService: AuthService,
    private router: Router,
    private httpService: HttpService
  ) {
    this.fetchData();
  }

  ngOnInit(): void { 
    
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
      this.router.navigate(['/auth/login']);
    }
  }
}
