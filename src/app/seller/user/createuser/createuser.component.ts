import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';
import { ToastrService } from 'ngx-toastr';


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
  myerrors?: any;
  baseUrl = `https://shop-api.ngminds.com`;
  constructor(private toastr:ToastrService,private authService: AuthService, private httpService: HttpService, private router: Router) {

  }
  ngOnInit() {

  }

  // create User
  onSubmit() {


    let url = `${this.baseUrl}/users`;
    // console.log("api call")
    let userInfo = {
      email: this.email,
      password: this.password,
      name: this.fullName,
      role: this.role
    }
    let token = this.authService.getCurrentToken();
    this.httpService.createUserRequest(url, userInfo, token).subscribe((response: any) => {
      this.router.navigate(["/manage-user"]);
      this.toastr.success("","User has been created successffuly!",{
        timeOut:3000
      })
    }, (error: any) => {
      this.toastr.error("",error,{
        timeOut:3000
      })
    });





  }

}
