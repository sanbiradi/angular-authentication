import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
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
    private toastr: ToastrService
  ) {
    this.fetchData();
  }

  ngOnInit(): void {


  }


  showSweetAlert(): Promise<boolean> {
    return Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete the user.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      return result.isConfirmed;
    });
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
          }, error => {
            this.toastr.error("", error, {
              timeOut: 3000
            })
          });
      }

    }, 1500);
  }

  // delete profile
  async deleteUser(event: any, id: any) {
    const isConfirmed = await this.showSweetAlert();
    if (isConfirmed) {
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
