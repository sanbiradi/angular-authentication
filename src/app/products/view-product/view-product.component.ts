import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManageProductsService } from '../manage-products.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent {
  productId!: any;
  product!: any;
  errorMessage: any;
  hoverImage: any = null;
  constructor(private activatedRoute: ActivatedRoute, private manageProducts: ManageProductsService) {
  }
  removeImageBorder(e: any) {
    e.target.classList.remove("border")
    e.target.classList.remove("border-primary")
  }
  
  imageMouseEnter(e: any) {
    this.hoverImage = e.target.src;
    if (!e.target.classList.contains("custom-border")) {
      e.target.classList.add("border")
      e.target.classList.add("border-primary")
    }
  }


  ngOnInit() {
    // this.hoverImage = this.product.images[0].url;
    this.productId = this.activatedRoute.snapshot.paramMap.get("id");
    this.getProductInfo(this.productId)
    
  }

  getProductInfo(id: any) {
    this.manageProducts.getProductInfo(this.productId).subscribe(data => {
      this.product = data;
      this.hoverImage = this.product.images[0].url;
    }, error => {
      error = this.errorMessage;
    });
  }


}
