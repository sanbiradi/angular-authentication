import { Component } from '@angular/core';
import { ManageProductsService } from '../manage-products.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent {
  products: any = [];
  viewedProduct: any;
  filters: Object = {
    sortBy: "name",
    limit: 10,
    page: 1
  }
  updateProduct:any; 
  noproducts!: boolean;
  message!: String;
  type!: boolean;
  constructor(private manageProduct: ManageProductsService) {

  }

  ngOnInit() {
    this.loadProducts();

  }

  loadProducts() {
    this.manageProduct.getProducts(this.filters).subscribe(data => {
      this.products = data.results;
      if (this.products.length == 0) {
        this.noproducts = true;
      } else {
        this.noproducts = false;
      }
    }, error => {
      this.message = error;
      this.type = false;
    })
  }

  deleteProduct(id: String) {
    this.manageProduct.deleteProduct(id).subscribe(data => {
      this.message = `Product has been deleted successfully!`;
      this.type = true;
      this.loadProducts();
      this.viewedProduct = false;
    }, error => {
      this.message = error;
      this.type = false;
    })
  }

  getProductInfo(id: String) {
    this.manageProduct.getProductInfo(id).subscribe(data => {
      this.viewedProduct = data;
      console.log(this.viewedProduct,data);
        }, error => {
      this.message = error;
      this.type = false;
    })
  }

  updateProductDetails(id:String){

  }

}
