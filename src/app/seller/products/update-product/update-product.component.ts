import { Component } from '@angular/core';
import { ManageProductsService } from '../../services/manage-products.service';
import { ActivatedRoute } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';



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


  ngOnInit(): void {
    this.editor = new Editor();

    setTimeout(() => {
      if (this.oldImages.length == 0)
        this.hoverImage = false;
    }, 1000)
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  handleUploadEvent(e: any) {
    if (e) {
      this.getProductInfo(this.productId);
    }

  }

  oldImages: any[] = [];

  message!: String;
  type!: boolean;

  imagesIdsToDelete: any = [];

  product = ({
    name: '',
    description: '',
    price: '',
  });

  hoverImage: any = null;
  files: File[] = [];
  imagesIds: any;
  newImages: any[] = [];
  filesData = new FormData();

  onRemove(event: any, i: any) {
    let findUrl = URL.createObjectURL(event);
    this.newImages.splice(this.newImages.indexOf(findUrl), 1);
    this.files.splice(i, 1);
    if (this.newImages.length > 0) {
      this.hoverImage = this.newImages[this.newImages.length - 1]
    }
  }


  onFileSelected(event: any): void {
    // console.log(event.addedFiles)
    this.files.push(...event.addedFiles);
    for (let item of event.addedFiles) {
      this.newImages.push(URL.createObjectURL(item));
      this.filesData.append('images', item);
    }
    this.hoverImage = this.newImages[0];
  }

  // imageMouseEnter(event: any) {
  //   this.hoverImage = event.target.src;
  //   if (!event.target.classList.contains("custom-border")) {
  //     event.target.classList.add("border")
  //     event.target.classList.add("border-primary")
  //   }

  // }



  // removeImageBorder(event: any) {
  //   event.target.classList.remove("border")
  //   event.target.classList.remove("border-primary")
  // }
  //

  imageMouseEnter(e: any) {
    this.hoverImage = e.target.src;
    if (!e.target.classList.contains("custom-border")) {
      e.target.classList.add("border")
      e.target.classList.add("border-primary")
    }
  }


  removeImageBorder(e: any) {
    e.target.classList.remove("border")
    e.target.classList.remove("border-primary")
  }

  onSubmit(): void {
    if (this.product.name && this.product.description && this.product.price) {

      //update product details
      let newBody = {
        name: this.product.name,
        description: this.product.description,
        price: this.product.price
      }

      let updateImagesBody = {
        new_images: this.newImages,
        delete: this.imagesIdsToDelete
      }

      this.manageProduct.updateProductDetails(this.productId, newBody).subscribe(data => {

        this.manageProduct.updateProductImages(this.productId, this.filesData).subscribe(data => {
          this.message = `Product Details are updated successfully!`;
          this.type = true;
          this.files = [];
          
          this.imagesIdsToDelete = [];
        }, error => {
          this.message = error;
          this.type = true;
        })

      }, error => {
        this.message = error;
        this.type = false;
      })
    } else {
      this.message = `Please enter all the require information!`;
      this.type = false;
    }
  }

  imageDoubleClickDelete(event: any, index: any, typedata: any) {
    if (confirm("Are you sure you want to delete this image.")) {
      if (typedata == 'oldimages') {
        this.imagesIdsToDelete.push(this.imagesIds[index])
        this.oldImages.splice(index, 1);
        console.log(this.imagesIdsToDelete);
        if (this.newImages.length > 0)
          this.hoverImage = this.newImages[0];
      } else if (typedata == 'newimages') {
        this.newImages.splice(index, 1);
        this.files.splice(index, 1);
        if (this.oldImages.length > 0)
          this.hoverImage = this.oldImages[0];
      }
    }
  }


  getProductInfo(id: String) {
    this.manageProduct.getProductInfo(id).subscribe(data => {
      this.product = data;
      this.oldImages = data.images.map((e: any) => e.url);
      this.hoverImage = this.oldImages[0];
      this.imagesIds = data.images.map((e: any) => e.public_id);
    }, error => {
      this.message = error;
      this.type = false;
    })
  }


  editor!: Editor;
  toolbar: Toolbar = [
    // default value
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear'],
  ];


  colorPresets = ['red', '#FF0000', 'rgb(255, 0, 0)'];
}
