import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    console.log();
    if (Object.keys(this.user).length==0) {
      this.user = false;
    }
  }

  logout() {
    if (this.authService.logout()) this.router.navigate(['/auth/login']);
  }
}
