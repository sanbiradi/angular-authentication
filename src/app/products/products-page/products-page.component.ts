import { Component, TemplateRef } from '@angular/core';
import { Renderer2, ElementRef } from '@angular/core';

import { ManageProductsService } from '../manage-products.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})

export class ProductsPageComponent {
  modalRef?: BsModalRef;


  openModal(template: TemplateRef<any>, id: any) {
    this.modalRef = this.modalService.show(template);
    this.getProductInfo(id);
  }


  selectedLimit: number = 10;
  selectNameFilter!: string;
  selectPriceFilter!: string;
  limitOptions: any = [
    10, 20, 30, 40
  ]

  itemsPerPage = this.selectedLimit / 2;

  allProducts: number = this.selectedLimit;
  pagination: number = 1;

  totalResults!: number;
  selectedCategory!: String;
  products: any = [];
  viewedProduct: any;
  dom = document.querySelector('.grecaptcha-badge') as HTMLElement;

  filters: any = {
    sortBy: 'name',
    limit: this.selectedLimit,
    page: this.pagination
  }

  images: any = [];

  updateProduct: any;
  noproducts!: boolean;
  message!: String;
  type!: boolean;

  constructor(private renderer: Renderer2, private el: ElementRef, private modalService: BsModalService, private manageProduct: ManageProductsService) {

  }

  renderPage(event: any) {
    this.pagination = event;
    this.filters.page = this.pagination
    this.loadProducts();
  }

  onCategoryChange(e: any) {
    console.log(this.selectNameFilter, this.selectPriceFilter)
  }

  onLimitChange() {
    this.filters.limit = this.selectedLimit;
    this.pagination = 1;
    this.loadProducts();
  }

  ngOnInit() {
    this.loadProducts();
    this.dom.style.display = 'none';
    this.dom.style.visibility = 'hidden'
  }

  ngAfterViewInit() {

  }
  loadProducts() {
    this.manageProduct.getProducts(this.filters).subscribe(data => {
      this.products = data.results;
      console.log(data);
      this.totalResults = data.totalResults;
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

    }, error => {
      this.message = error;
      this.type = false;
    })
  }





}
