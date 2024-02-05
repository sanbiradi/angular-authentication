import { Component, EventEmitter, Output, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, pluck } from 'rxjs';
import * as selectors from "./store/cart.selectors"

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  outputproducts$: Observable<any> = this.store.select(selectors.selectCartState).pipe(pluck('products'));
  constructor(private store:Store,private renderer:Renderer2 ){

  }
  ngOnInit(){
    this.hideRecaptchaBadge();
  }
  
  private hideRecaptchaBadge(): void {
    const badge = document.querySelector('.grecaptcha-badge');
    if (badge) {
      this.renderer.setStyle(badge, 'display', 'none');
    }
  }
}
