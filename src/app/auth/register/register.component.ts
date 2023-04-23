import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  fullName: string = '';
  companyName: string = '';
  role: string = '';
  isEmailVerified: boolean = true;
  validationerr?: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.validationerr =(
      this.email &&
      this.password &&
      this.fullName &&
      this.companyName &&
      this.role)
        ? false
        : true;
    if (
      this.email &&
      this.password &&
      this.fullName &&
      this.companyName &&
      this.role
    ) {
      this.authService.register(
        this.email,
        this.password,
        this.fullName,
        this.companyName,
        this.role,
        this.isEmailVerified
      );
      this.router.navigate(['/auth/login']);
    }
  }
}
