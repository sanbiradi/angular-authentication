import { Component } from '@angular/core';
import { ManageProductsService } from '../manage-products.service';
import { ActivatedRoute } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent {

  productId!: any;
  constructor(private modalService: BsModalService, private manageProduct: ManageProductsService, private activatedRoute: ActivatedRoute) {
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
      this.manageProduct.updateProductDetails(this.productId, newBody).subscribe(data => {
        this.message = `Product Details are updated successfully!`;
        this.type = true;
      }, error => {
        this.message = error;
        this.type = false;
      })
    } else {
      this.message = `Please enter all the require information!`;
      this.type = false;
    }
  }

  oldimageDoubleClick(event: any, index: any) {
    if (confirm("Are you sure you want to delete this image.")) {
      this.oldImages.splice(index, 1);
      let body = {
        delete: this.imagesIds[index]
      }
      this.manageProduct.updateProductImages(this.productId, body).subscribe(data => {
        this.message = "Product image has been deleted successfully!";
        this.type = true;
        if (this.oldImages.length > 0)
          this.hoverImage = this.oldImages[this.oldImages.length - 1];
        else {
          this.hoverImage = false;
        }
      }, error => {
        this.message = error;
        this.type = false;
      })

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
