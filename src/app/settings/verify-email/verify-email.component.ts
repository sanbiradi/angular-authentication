import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpService } from 'src/app/auth/http.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  user!: any;
  message!: string;
  type!: boolean;
  token!: string;
  ltoken!: string;
  success: boolean = false;
  isVerified!: any;
  constructor(private authService: AuthService, private httpService: HttpService) {
    this.token = this.authService.getCurrentToken();
    this.fetchData()

  }
  ngOnInit() {
  
  
  }

  // profile informations fetching 
  fetchData() {
    setTimeout(() => {
      if (this.token) {
        this.httpService
          .secureGet(`${this.authService.baseUrl}/auth/self`, this.token)
          .subscribe((data) => {
            this.user = data;
            this.isVerified = this.user?.isEmailVerified;
          });
      }
    });
  }

  sendVerification() {
    if (this.token) {
      let url = `${this.authService.baseUrl}/auth/send-verification-email`;
      console.log(url);
      this.httpService.postWithToken(url, this.token).subscribe((data) => {
        this.type = true;
        this.message = data;
        this.success = true
      }, error => {
        this.message = error;
        this.type = false;
      })
    }
  }
}
