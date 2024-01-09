import { Component } from '@angular/core';
import { Renderer2, ElementRef } from '@angular/core';
import { ManageProductsService } from '../../services/manage-products.service';
import { AuthService } from 'src/app/services/auth.service';
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


  selectedCategory: String='name';
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

  constructor(private authService: AuthService, private renderer: Renderer2, private el: ElementRef, private manageProduct: ManageProductsService) {

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
      console.log("data",data)
      this.totalResults = data.totalResults;
      if (this.products.length <= 0) {
        this.noproducts = true;
      } else {
        this.noproducts = false;
      }
    }, error => {
      this.message = error;
      this.type = false;
    })
  }

  deleteProduct(id: String, event: any) {
    let input = confirm("Are you sure you want to delete this product?");
    if (input == true) {
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
  }

  getProductInfo(id: String) {
    this.manageProduct.getProductInfo(id).subscribe(data => {
      this.viewedProduct = data;
    }, error => {
      this.message = error;
      this.type = false;
    })
  }





}
