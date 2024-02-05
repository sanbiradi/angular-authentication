import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ShophttpService } from '../services/shophttp/shophttp.service';
import { Store } from '@ngrx/store';
import { Product } from '../cart/store/product';
import { addproduct } from '../cart/store/cart.actions';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent {
  productId!: any;
  product!: any;
  item: any;
  errorMessage: any;
  hoverImage: any = null;
  constructor(private renderer:Renderer2 ,private store: Store<{ cart: { product: Product[] } }>, private toastr: ToastrService, private activatedRoute: ActivatedRoute, private manageProducts: ShophttpService) {
    
  }

  
  private hideRecaptchaBadge(): void {
    const badge = document.querySelector('.grecaptcha-badge');
    if (badge) {
      this.renderer.setStyle(badge, 'display', 'none');
    }
  }
  add() {
    let p: Product;
    if (this.item.deal) {
      p = {
        productId: this.item._id,
        name: this.item.name,
        price: this.item.price,
        qty: 1,
        subTotal: this.item.deal.price,
        deal: {
          discount: this.item.deal.discount,
          ends: this.item.deal.ends,
          price: this.item.deal.price
        }
      }
    }
    else {
      p = {
        productId: this.item._id,
        name: this.item.name,
        price: this.item.price,
        qty: 1,
        subTotal: this.item.price
      }
    }
    this.store.dispatch(addproduct({ product: p }));
    this.store.select('cart').subscribe(data => localStorage.setItem('cart', JSON.stringify(data)));
    this.toastr.success('','product Added into cart',{
      timeOut:2000
    })
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
    this.getProductInfo(this.productId);
    this.hideRecaptchaBadge();
  }

  getProductInfo(id: any) {
    this.manageProducts.getSingleProduct(this.productId).subscribe(data => {
      this.product = data;
      this.hoverImage = this.product.images[0].url;
      this.item = data;

    }, error => {
      this.toastr.error("", error, {
        timeOut: 3000
      })
    });
  }


}
