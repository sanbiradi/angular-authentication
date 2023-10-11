import { Component } from '@angular/core';
import { ManageProductsService } from '../manage-products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent {

  productId!: any;
  constructor(private manageProduct: ManageProductsService, private activatedRoute: ActivatedRoute) {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getProductInfo(this.productId);
  }


  displaySelectedImg: string | ArrayBuffer | null | undefined = null;
  product!: any;
  selectedFile!: File;
  imagesIds: any;

  message!: String;
  type!: boolean;


  onFileSelected(event: any): void {
    const fileList: FileList = event.target.files;
    this.product.images = Array.from(fileList);

    const imageInput = event.target as HTMLInputElement;
    if (imageInput.files && imageInput.files.length > 0) {
      const file = imageInput.files[0];

      // Check if the selected file is an image (you may want to add more validation)
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.displaySelectedImg = e.target?.result;
        };
        reader.readAsDataURL(file);
      } else {
        // Handle cases where a non-image file is selected
        this.displaySelectedImg = null;
        alert('Please select an image file.');
      }
    } else {
      this.displaySelectedImg = null;
    }


  }

  onSubmit(): void {
    if (this.product.name && this.product.description && this.product.price) {
      let flag = 0;
      //update product details
      let newBody = {
        name: this.product.name,
        description: this.product.description,
        price: this.product.price
      }

      this.manageProduct.updateProductDetails(this.productId, newBody).subscribe(data => {
        flag = 1;
      }, error => {
        this.message = error;
        this.type = false;
      })

      //imageFiles to be updated
      const imageFiles = new FormData();
      for (const image of this.product.images) {
        imageFiles.append('new_images', image, image.name);
      }
      for (const id of this.imagesIds) {
        imageFiles.append('delete', id);
      }

      //call to update images
      this.manageProduct.updateProductImages(this.productId, imageFiles).subscribe(data => {
        this.getProductInfo(this.productId);
        if (flag == 1) {
          this.message = `product has been updated successfully`;
          this.type = true
        }
      }, error => {
        this.message = error;
        this.type = false
      })


      //make fields empty
      this.product.description = ''
      this.product.name = ''
      this.product.images = ''
      this.product.price = 0

    } else {
      this.message = `Please enter all the require information!`;
      this.type = false;
    }
  }



  getProductInfo(id: String) {
    this.manageProduct.getProductInfo(id).subscribe(data => {
      this.product = data
      console.log(this.product)
      this.imagesIds = data.images.map((e: any) => e.public_id);
    }, error => {
      this.message = error;
      this.type = false;
    })
  }




}
