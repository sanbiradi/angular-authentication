import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpService } from 'src/app/auth/http.service';

@Component({
  selector: 'app-edit-userinfo',
  templateUrl: './edit-userinfo.component.html',
  styleUrls: ['./edit-userinfo.component.scss']
})
export class EditUserinfoComponent implements OnInit{
id?:any;
// email: string = '';
// password: string = '';
// fullName: string = '';
// role: string = '';
// validationerr?: Boolean;
isloading:boolean = true;

user?:any ;

u?:any;
token?:any;
users?:any;
baseUrl = `https://shop-api.ngminds.com`;

  constructor(private router:Router,private route:ActivatedRoute,private httpService:HttpService, private authService:AuthService){

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.fetchData(this.id);
  
  }

  


   // profile informations fetching 
   fetchData(id:any) {
   
      this.u = localStorage.getItem('u') || '';
      this.token = JSON.parse(this.u);
      if (this.token) {
        this.httpService
          .secureGet(`${this.baseUrl}/users`, this.token)
          .subscribe((data:any) => {
            this.users = data;
            this.isloading  = false;   
           this.user= this.users.results.find((item:any)=>item._id===id);
          });
      }

     
  
  }



  


  onSubmit(): any {
    console.log({ email: this.user.email, name: this.user.name});
    // let userInfo = { email: this.email, password: this.password, name: this.fullName , role:"user"};
    // // this.authService.createUser(userInfo);
    let url = `${this.baseUrl}/users/${this.id}`
   let userInfo = { email: this.user.email, name: this.user.name};
   let token = this.authService.getCurrentToken();
   this.httpService.updateUserInfo(url,userInfo,token).subscribe((data:any)=>{
    console.log(data);
    this.router.navigate(["/manage-user"]);
   },error=>{
    console.log(error);
   });
    // this.validationerr = Boolean(
    //   this.email && this.password && this.fullName && this.role
    // );
    // if (this.validationerr) {
     
    // }
  }
  


  


}
