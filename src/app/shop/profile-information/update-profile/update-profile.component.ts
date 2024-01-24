import { Component } from '@angular/core';
import { ShophttpService } from '../../services/shophttp/shophttp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent {
  isEmailNameMode = true;
  email?: string;
  name?: string;
  profilePicture?: string;
  fileData = new FormData();

  type?: boolean;
  message?: string | boolean;
  constructor(private shophttp: ShophttpService, private router:Router  ) {

  }

  ngOnInit() {
    this.loadProfileData();
  }

  loadProfileData() {
    this.shophttp.getUserDetails().subscribe(data => {
      this.name = data.name;
      this.email = data.email;
      this.profilePicture = data.picture;
    }, error => {

    });
  }

  onFileSelected(event: any): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      const file: File = fileInput.files[0];
      // Perform actions with the selected file
      this.fileData.append("picture", file)
      this.shophttp.updateUserProfilePic(this.fileData).subscribe(data => {
        this.profilePicture = data.picture;
        setTimeout(() => {
          this.message = "Profile picture uploaded successfully!";
          this.type = true;
        }, 2000);

      }, error => {
        this.message = error;
        this.type = false;
      });
    }
  }


  onSaveNameEmail() {
    if (this.email && this.name) {
      this.shophttp.updateUserProfile({ email: this.email, name: this.name }).subscribe(data => {
        setTimeout(() => {
          this.message = "profile updated successfully!";
          this.type = true;
        }, 2000);
        this.loadProfileData();
        this.isEmailNameMode = false;
      },
        error => {
          this.message = error;
          this.type = false;
        });
    }

  }

  removeProfile() {
    if (confirm("Do you want remove the profile.")) {
      this.shophttp.removeUserProfilePic().subscribe(data => {
        this.loadProfileData();
        setTimeout(() => {
          this.message = "Profile picture removed!";
          this.type = true;
        }, 2000);


      }, error => {
        this.message = error;
        this.type = true;
      })
    }
  }
 

  toggleEmailName() {
    this.isEmailNameMode = !this.isEmailNameMode;
  }

  deleteAccountEvent(){
    if(confirm("Are you sure you want to delete this account parmanantly?")){
      this.shophttp.deleteMyAccount().subscribe(data=>{
        this.router.navigate(["customer/login"]);
      },error=>{
        this.message = error;
        this.type = false;
      })
    }
  }

}
