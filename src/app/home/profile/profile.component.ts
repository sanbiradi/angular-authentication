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
  u: any;
  token?: string = '';

  baseUrl = `https://shop-api.ngminds.com`;
  constructor(
    private authService: AuthService,
    private router: Router,
    private httpService: HttpService
  ) {
    this.fetchData();
  }

  ngOnInit(): void {}
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
