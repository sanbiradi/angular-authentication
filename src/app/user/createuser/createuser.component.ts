import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.scss']
})
export class CreateuserComponent implements OnInit {
  email: string = '';
  password: string = '';
  fullName: string = '';
  role: string = '';
  validationerr?: Boolean;


  constructor(private authService: AuthService) {

  }
  ngOnInit() {

  }
  onSubmit(): any {
    // console.log({ email: this.email, password: this.password, name: this.fullName, rol: this.role });
    let userInfo = { email: this.email, password: this.password, name: this.fullName , role:"user"};
    this.authService.createUser(userInfo);
    this.validationerr = Boolean(
      this.email && this.password && this.fullName && this.role
    );
    if (this.validationerr) {
     
    }
  }
}
