import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';
import { User } from '../../user';
import { ToastrService } from 'ngx-toastr';

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
  isVerified: boolean | undefined | null = null;

  constructor(private toastr:ToastrService,private authService: AuthService, private httpService: HttpService) {

  }
  ngOnInit() {

  }

  ngAfterViewInit() {
    this.token = this.authService.getCurrentToken();
    this.fetchData()
  }
  // profile informations fetching 
  fetchData() {
    setTimeout(() => {
      if (this.token) {
        this.httpService
          .secureGet(`${this.authService.baseUrl}/auth/self`, this.token)
          .subscribe((data) => {
            this.user = data;
            if (this.user?.isEmailVerified)
              this.isVerified = true;
            else
              this.isVerified = false
          },error=>{
            this.toastr.error("",error,{
              timeOut:3000
            })
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
        this.success = true;
      }, error => {
        this.toastr.error("",error,{
          timeOut:3000
        })
      })
    }
  }
}
