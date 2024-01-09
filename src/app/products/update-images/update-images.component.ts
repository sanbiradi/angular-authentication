import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ManageProductsService } from '../../services/manage-products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-images',
  templateUrl: './update-images.component.html',
  styleUrls: ['./update-images.component.scss']
})
export class UpdateImagesComponent {

  @Output() dataEvent = new EventEmitter<boolean>()
  message: any;
  type: any;
  hoverImage: any = null;
  newImages: any[] = [];
  files: File[] = [];
  @Input() productId: any;
  @Input() imagesIdsToDelete: any;
  filesData = new FormData();


  constructor(private router: Router, private manageProduct: ManageProductsService) {

  }
  ngOnInit() {
    // console.log(this.productId);
  }

  onRemove(event: any, i: any) {
    let findUrl = URL.createObjectURL(event);
    this.newImages.splice(this.newImages.indexOf(findUrl), 1);
    this.files.splice(this.files.indexOf(event), 1);
    if (this.newImages.length > 0) {
      this.hoverImage = this.newImages[this.newImages.length - 1]
    }
  }


  onFileSelected(event: any): void {
    this.files.push(...event.addedFiles);
    if (this.files.length != 0) {
      for (let item of this.files) {
        this.newImages.push(URL.createObjectURL(item));
        this.filesData.append('images', item);
      }
      this.hoverImage = this.newImages[0];
    }
  }


  imageMouseEnter(event: any) {
    this.hoverImage = event.target.src;
    if (!event.target.classList.contains("custom-border")) {
      event.target.classList.add("border")
      event.target.classList.add("border-primary")
    }

  }



  removeImageBorder(event: any) {
    event.target.classList.remove("border")
    event.target.classList.remove("border-primary")
  }


  reload: any;

  onUpload() {
    if(this.files.length>0){
      this.manageProduct.updateProductImages(this.productId, this.filesData).subscribe(data => {
        this.message = 'Products Images has been uploaded!';
        this.type = true;
        this.dataEvent.emit(true);
        this.files = [];
        this.hoverImage = null;
      }, error => {
        this.message = error;
        this.type = true;
      })
    }else{
      alert("Please select image files first!");
    }
    
  }
}
