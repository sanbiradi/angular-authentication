import { Component } from '@angular/core';
import { ManageProductsService } from '../manage-products.service';

import { Editor, Toolbar } from 'ngx-editor';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {


  constructor(private manageProduct: ManageProductsService) {
  }


  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
  

  images: any[] = [];

  selectedFiles!: File[];

  message!: String;
  type!: boolean;

  filesData = new FormData();

  product = ({
    name: '',
    description: '',
    price: '',
  });

  hoverImage: any;

  files: File[] = [];
  onFileSelect(event: any) {

    this.files.push(...event.addedFiles);
    if (this.files.length != 0) {
      let item = this.files[this.files.length - 1]
      this.images.push(URL.createObjectURL(item));
      this.filesData.append('images', item);
      this.hoverImage = this.images[0];
    }

  }

  imageMouseEnter(e: any) {
    this.hoverImage = e.target.src;
    e.target.classList.add("border")
    e.target.classList.add("border-primary")
  }

  removeImageBorder(e: any) {
    e.target.classList.remove("border")
    e.target.classList.remove("border-primary")
  }


  onRemove(event: any, i: number) {
    let findUrl = URL.createObjectURL(event);
    this.images.splice(this.images.indexOf(findUrl), 1);
    this.files.splice(this.files.indexOf(event), 1);
  }


  onSubmit(): void {
    console.log(this.product, this.images, this.files, this.filesData)
    if (this.product.name && this.product.description && this.product.price && this.images) {
      this.filesData.append('name', this.product.name);
      this.filesData.append('description', this.product.description);
      this.filesData.append('price', String(this.product.price));
      this.manageProduct.createProduct(this.filesData).subscribe(data => {
        this.message = `Product : ${this.product.name} has been created successfully.`;
        this.type = true;
        alert("Product Added successfully!")
      }, error => {
        this.message = error;
        this.type = false;
      })
      this.product.description = ''
      this.product.name = ''
      this.product.price = '';
    } else {
      this.message = `Please enter all the require information!`;
      this.type = false;
    }
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
