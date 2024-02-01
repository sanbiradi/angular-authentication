import { Component } from '@angular/core';
import { Renderer2, ElementRef } from '@angular/core';
import { ManageProductsService } from '../../services/manage-products.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})

export class ProductsPageComponent {


  selectedLimit: number = 10;
  limitOptions: any = [
    10, 20, 30, 40
  ]

  itemsPerPage = this.selectedLimit / 2;

  allProducts: number = this.selectedLimit;
  pagination: number = 1;
  categories = ["name", "price"];
  totalResults!: number;


  selectedCategory: String = 'name';
  products: any = [];
  viewedProduct: any;

  filters: any = {
    sortBy: this.selectedCategory,
    limit: this.selectedLimit,
    page: this.pagination
  }

  images: any = [];
  updateProduct: any;
  noproducts: boolean | undefined | null;
  message!: String;
  type!: boolean;

  constructor(private toastr: ToastrService, private authService: AuthService, private manageProduct: ManageProductsService) {

  }

  renderPage(event: any) {
    this.pagination = event;
    this.filters.page = this.pagination
    this.loadProducts();
  }

  onCategoryChange(e: any) {
    this.filters.sortBy = this.selectedCategory;
    this.loadProducts();
  }

  onLimitChange() {
    this.filters.limit = this.selectedLimit;
    this.loadProducts();
  }

  ngOnInit() {
    this.loadProducts();
    this.pagination = 1;
  }

  loadProducts() {
    this.manageProduct.getProducts(this.filters).subscribe(data => {
      this.products = data.results;
      this.totalResults = data.totalResults;
      if (this.products.length <= 0) {
        this.noproducts = true;
      } else {
        this.noproducts = false;
      }
    }, error => {
      this.toastr.error("", error, {
        timeOut: 3000
      })
    })
  }
  

 async deleteProduct(id: String, event: any) {

    let isConfirm = await this.manageProduct.showSweetAlert("you want to delete this product");
    if (isConfirm) {
      this.manageProduct.deleteProduct(id).subscribe(data => {
        // this.message = `Product has been deleted successfully!`;
        // this.type = true;
        this.toastr.success("",`Product has been deleted successfully!`,{
          timeOut:3000
        });
        this.loadProducts();
        this.viewedProduct = false;
      }, error => {
        this.toastr.error("", error, {
          timeOut: 3000
        })
      })
    }
  }

  getProductInfo(id: String) {
    this.manageProduct.getProductInfo(id).subscribe(data => {
      this.viewedProduct = data;
    }, error => {
      // this.message = error;
      // this.type = false;
      this.toastr.error("", error, {
        timeOut: 3000
      })
    })
  }





}
