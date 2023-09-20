import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as jwt from 'jsonwebtoken';
import { HttpService } from '../http.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  error!: boolean;
  tokenTrue!: boolean;


  confirmPassword!: any;
  password!: any;
  token!: any;

  constructor(private activatedRoute: ActivatedRoute, private httpService: HttpService, private authService: AuthService) {

  }
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'];
    });

    let url = `${this.authService.baseUrl}/auth/verify-email?token=${this.token}`;
    console.log(url);
    this.httpService.postUrl(url).subscribe((data) => {
      console.log(data);
    }, error => {
      console.log(error);
    })


  }
  resetPassword() {

  }

}
