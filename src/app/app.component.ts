import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  Logined: boolean = false;
  constructor(private authService: AuthService, private router: Router) {
   
  }

  title = 'angular-assignment';

  ngOnInit(): void {
    console.log(this.Logined);
    this.Logined = this.authService.isLoggedIn();
  }
    
  logout() {
    if (this.authService.logout()) this.router.navigate(['/auth/login']);
    this.Logined = false;
  }
}
