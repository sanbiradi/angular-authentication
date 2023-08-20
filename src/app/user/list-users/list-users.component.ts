import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpService } from 'src/app/auth/http.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {


  users:any=[];
  u:any;
  token:any;



  baseUrl = `https://shop-api.ngminds.com`;
  constructor(
    private authService: AuthService,
    private router: Router,
    private httpService: HttpService,
  ) {
    this.fetchData();
  }

  ngOnInit(): void { 

    
  }



  // profile informations fetching 
  fetchData() {
    setTimeout(() => {
      this.u = localStorage.getItem('u') || '';
      this.token = JSON.parse(this.u);
      if (this.token) {
        this.httpService
          .secureGet(`${this.baseUrl}/users`, this.token)
          .subscribe((data:any) => {
            this.users.push(data);
            console.log(data)
            console.log(this.users);
          });
      }
      
    }, 1500);
  }

  // delete profile
  deleteUser(id:string):any{
    this.authService.deleteUser(id);
  }

  // update user
  updateUser(id:string):any{
    this.router.navigate([`/edit-user/${id}`]);
  }
}
