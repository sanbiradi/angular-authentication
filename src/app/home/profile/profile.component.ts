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
  user: any;
  checkLogin?: boolean = false;
  baseUrl = `https://shop-api.ngminds.com`;
  constructor(
    private authService: AuthService,
    private router: Router,
    private httpService: HttpService
  ) {
    let token = JSON.parse(localStorage.getItem('u') || '""');
    if (token) {
        this.httpService
        .secureGet(`${this.baseUrl}/auth/self`, token)
        .subscribe((data) => {
          this.user = data;
        }); 
        console.log(this.user);
    }
  }

  ngOnInit(): void {
   
  }
  logout() {
    if (this.authService.logout()) {
      this.router.navigate(['/auth/login']);
    }
  }
}
