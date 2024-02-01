import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ShophttpService } from '../../services/shophttp/shophttp.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent {


  @ViewChild('template') templateRef?: TemplateRef<any>;
  isEmailNameMode = true;
  email?: string;
  name?: string;
  profilePicture?: string;
  fileData = new FormData();

  imageChangedEvent: any = '';
  croppedImage: any = false;

  modalRef?: BsModalRef;

  type?: boolean;
  fileInput: any
  message?: string | boolean;
  constructor(private toastr: ToastrService, private modalService: BsModalService, private sanitizer: DomSanitizer, private shophttp: ShophttpService, private router: Router) {

  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  openModal() {
    if (this.templateRef) {
      this.modalRef = this.modalService.show(this.templateRef);
    } else {
      console.error('TemplateRef is not defined');
      // Handle the case where templateRef is not defined
    }
  }

  ngOnInit() {
    this.loadProfileData();
  }



  clearFormData() {
    this.fileData = new FormData();
  }

  loadProfileData() {
    this.shophttp.getUserDetails().subscribe(data => {
      this.name = data.name;
      this.email = data.email;
      this.profilePicture = data.picture;
    }, error => {
      this.message = `Can't load the data, please check your internet connection.`;
    });
  }

  onFileSelected(event: any): void {
    this.fileInput = event.target as HTMLInputElement;
    if (this.fileInput.files && this.fileInput.files.length > 0) {
      this.imageChangedEvent = event;
      this.openModal();
    }
  }

  uploadProfileImg() {
    this.modalRef?.hide();
    if (this.fileData) {
      this.shophttp.updateUserProfilePic(this.fileData).subscribe(data => {
        this.profilePicture = data.picture;

        // this.message = "Profile picture uploaded successfully!";
        // this.type = true;
        this.toastr.success('Profile picture uploaded successfully!', 'Update profile image', {
          timeOut: 3000
        });

        this.fileInput = '';
        this.clearFormData();
        this.loadProfileData();
      }, error => {
        this.toastr.error(error, 'Error Message', {
          timeOut: 3000
        });
      });
    }

  }


  blobToFile(blob: any, fileName: string): File {
    const options = {
      type: blob.type,
    };

    // Create a File object from the Blob
    const file = new File([blob], fileName, options);

    return file;
  }


  onSaveNameEmail() {
    if (this.email && this.name) {
      this.shophttp.updateUserProfile({ email: this.email, name: this.name }).subscribe(data => {
        this.toastr.success("profile updated successfully!", "Success", {
          timeOut: 3000
        })
        this.loadProfileData();
        this.isEmailNameMode = true;
      },
        error => {
          this.toastr.error(error, "error", {
            timeOut: 3000
          })
        });
    }

  }

  async removeProfile() {
      const isConfirmed = await this.showSweetAlert();
    if (isConfirmed) {
      this.shophttp.removeUserProfilePic().subscribe(data => {
        this.loadProfileData();
        this.toastr.success("Profile picture removed!", "Success", {
          timeOut: 3000
        });
        Swal.fire("Profile Photo Deleted!", "", "success");
      }, error => {
        this.toastr.error(error, "error", {
          timeOut: 3000
        })
        Swal.fire(error, "", "error");
      })
    }
  }


  toggleEmailName() {
    this.isEmailNameMode = !this.isEmailNameMode;
  }

  showSweetAlert(): Promise<boolean> {
    return Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this account parmanantly?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  async deleteAccountEvent() {
    const isConfirmed = await this.showSweetAlert();
    if (isConfirmed) {
      this.shophttp.deleteMyAccount().subscribe(data => {
        this.router.navigate(["customer/login"]);
        this.toastr.success("Account has been deleted successfully!", "Success", {
          timeOut: 3000
        })
        Swal.fire("Account Deleted!", "", "success");
      }, error => {
        Swal.fire(error, "", "error");
      })
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }


  imageCropped(event: ImageCroppedEvent) {
    if (event.objectUrl)
      this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
    // event.blob can be used to upload the cropped image
    const imgFile = this.blobToFile(event.blob, this.imageChangedEvent.target.name);
    if (!this.fileData.has("picture")) {
      this.fileData.append("picture", imgFile);
    }
  }


  imageLoaded(image: LoadedImage) {
    // show cropper
  }

  cropperReady() {
    // cropper ready
    if (this.fileData.get("picture"))
      this.uploadProfileImg();
  }

  loadImageFailed() {
    // show message
  }
}
