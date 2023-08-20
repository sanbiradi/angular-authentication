import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  validationerr?: string;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

 login() {

   
    if (this.email !== '' && this.password !== '') {
      if (this.authService.login(this.email, this.password)) {
        this.router.navigate(['/home']);
      } 
    }else{
      this.validationerr =  `empty`;
    }
  }
}
