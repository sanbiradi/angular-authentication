import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  validationerr?: boolean;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.validationerr = this.authService.login(this.email, this.password)
      ? false
      : true;
    console.log(this.validationerr);
    if (this.email !== '' && this.password !== '') {
      if (this.authService.login(this.email, this.password)) {
        this.router.navigate(['/my-profile']);
      }
    }
  }
}
