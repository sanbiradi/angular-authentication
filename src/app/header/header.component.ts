import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
 
  LogIn?:boolean;
  dom = document.querySelector('.grecaptcha-badge') as HTMLElement;
  constructor(private authService: AuthService, private router: Router) {
    this.LogIn = this.authService.isLoggedIn();
    // if(this.LogIn===false){
    //   this.router.navigate(['/auth/login']);
    // }
  }
  ngOnInit(): void {
    this.LogIn = this.authService.isLoggedIn();
    
  }
 
  logout() {
    if (this.authService.logout()){
      this.LogIn= false;
      this.dom.style.display = 'block';
      this.dom.style.visibility = 'visible'
      this.router.navigate(['/login']);
    }
  }
}
