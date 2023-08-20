import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-userinfo',
  templateUrl: './edit-userinfo.component.html',
  styleUrls: ['./edit-userinfo.component.scss']
})
export class EditUserinfoComponent implements OnInit{
id?:string;
email: string = '';
password: string = '';
fullName: string = '';
role: string = '';
validationerr?: Boolean;


  constructor(private route:ActivatedRoute){

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        // Now you have the ID from the route
        this.id = id;
          // You can use this ID to fetch data, make API calls, etc.
      }
    });
  }

  onSubmit(): any {
    // console.log({ email: this.email, password: this.password, name: this.fullName, rol: this.role });
    let userInfo = { email: this.email, password: this.password, name: this.fullName , role:"user"};
    // this.authService.createUser(userInfo);
    console.log(userInfo);
    this.validationerr = Boolean(
      this.email && this.password && this.fullName && this.role
    );
    if (this.validationerr) {
     
    }
  }
  


  


}
