import { Component } from '@angular/core';
import { ManageProductsService } from '../manage-products.service';
import { Product } from '../product';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {

  myFile!: File;
  constructor(private manageProduct: ManageProductsService) {

  }


  name!: any
  description!: any
  images!: any
  price!: Number
  selectedFile!: File;


  message!: String;
  type!: boolean;

  onFileSelected(event: any): void {
    // this.selectedFile = event.target.files[0];
    const fileList: FileList = event.target.files;
    this.images = Array.from(fileList);
  }

  onSubmit(): void {
    if (this.name && this.description && this.price && this.images) {
      const formData = new FormData();
      formData.append('name', this.name);
      formData.append('description', this.description);
      formData.append('price', String(this.price));
      for (const image of this.images) {
        formData.append('images', image, image.name);
      }
      this.manageProduct.createProduct(formData).subscribe(data => {
        this.message = `Product :${this.name} has been created successfully.`;
        this.type = true;
      }, error => {
        this.message = error;
        this.type = false;
      })
      this.description=''
      this.name=''
      this.images =''
      this.price=0

    } else {
      this.message = `Please enter all the require information!`;
      this.type = false;
    }
  }
}
