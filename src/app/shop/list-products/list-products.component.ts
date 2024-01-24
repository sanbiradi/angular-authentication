import { Component, Input, Renderer2 } from '@angular/core';
// import ShopProduct from '../shopproduct';
import { ShophttpService } from '../services/shophttp/shophttp.service';
import ShopProduct from '../shopproduct';
@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent {


  productsList?: any;
  selectedLimit?: any = 10;
  selectedCategory?: String = "Name";

  limitOptions?: Number[] = [10, 20, 30, 40];
  categories: String[] = ["Name", "Price"];

  pagination: number = 1;
  itemsPerPage: any = this.selectedLimit / 2;
  totalResults!: number;

  constructor(private shophttp: ShophttpService,private renderer: Renderer2) {

  }

  errorAlerts: any = '';




  filters: any = {
    sortBy: this.selectedCategory,
    limit: this.selectedLimit,
    page: this.pagination
  }

  ngAfterViewInit(): void {
    // Hide reCAPTCHA badge after the component has been loaded
    this.hideRecaptchaBadge();
  }

  private hideRecaptchaBadge(): void {
    const badge = document.querySelector('.grecaptcha-badge');
    if (badge) {
      this.renderer.setStyle(badge, 'display', 'none');
    }
  }

  loadAllProducts() {
    this.shophttp.getAllProductsRequest(this.filters).subscribe(data => {
      this.productsList = data.results;
      this.totalResults = data.totalResults;
    }, error => {
      console.log(error);
    });
  }

  onLimitChange() {
    this.filters.limit = this.selectedLimit;
    this.loadAllProducts();
  }

  ngOnInit() {
    this.loadAllProducts();
    this.pagination = 1;
  }

  renderPage(event: any) {
    this.pagination = event;
    this.filters.page = this.pagination
    this.loadAllProducts();
    console.log(this.pagination)
  }

  onCategoryChange(e: any) {
    this.filters.sortBy = this.selectedCategory;
    this.loadAllProducts();
  }
}
