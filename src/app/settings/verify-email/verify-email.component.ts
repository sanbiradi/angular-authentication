import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpService } from 'src/app/auth/http.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  message!:string;
  type!:boolean;
  token!: string;
  success:boolean = false;
  constructor(private authService: AuthService, private httpService: HttpService) {

  }
  ngOnInit() {
    this.token = this.authService.getCurrentToken();
  }

  sendVerification() {
    if (this.token) {
      let url = `${this.authService.baseUrl}/auth/send-verification-email`;
      console.log(url);
      this.httpService.postWithToken(url,this.token).subscribe((data)=>{
        this.type = true;
        this.message = data;
        this.success = true
      }, error=>{
        this.message = error;
        this.type = false;
      })
    }
  }
}
