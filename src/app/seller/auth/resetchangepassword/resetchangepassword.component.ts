import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as jwt from 'jsonwebtoken';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resetchangepassword',
  templateUrl: './resetchangepassword.component.html',
  styleUrls: ['./resetchangepassword.component.scss']
})
export class ResetchangepasswordComponent implements OnInit {
  error!: boolean;
  confirmPassword!: any;
  password!: any;
  token!: any;
  message!: string;
  type!: boolean

  constructor(private toastr: ToastrService, private router: Router, private activatedRoute: ActivatedRoute, private httpService: HttpService, private authService: AuthService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }
  ngOnInit() {
  }


  resetPassword() {
    if (this.password && this.confirmPassword) {
      let url = `${this.authService.baseUrl}/auth/reset-password`;
      let body = {
        password: this.confirmPassword
      }
      this.httpService.resetPassword(url, this.token, body).subscribe((data) => {
        // this.message = `Password has been changed successfully..`
        // this.type = true;
        this.toastr.success("", "Password has been changed successfully..", {
          timeOut: 3000
        });
        this.router.navigate(["/login"]);
      }, error => {
        this.message = error;
        this.type = false;
        this.toastr.error("", error, {
          timeOut: 3000
        })
      });
    }
  }
}
