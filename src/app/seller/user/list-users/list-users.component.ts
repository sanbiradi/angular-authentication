import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {


  users: any = [];
  u: any;
  token: any;



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
          .subscribe((data: any) => {
            this.users.push(data);
            // console.log(data)
            // console.log(this.users);
          });
      }

    }, 1500);
  }

  // delete profile
  deleteUser(event: any, id: any): any {

    if (confirm('Are you sure you want to delete this data.')) {
      event.target.innerText = `Deleting...`;
      this.authService.deleteUser(id);
      event.target.innerText = `Deleted`;
      this.router.navigateByUrl("/manage-user");
    }
  }

  // update user
  updateUser(id: string): any {
    this.router.navigate([`/edit-user/${id}`]);
  }
}
