import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartRoutingModule } from './cart-routing.module';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './store/cart.reducer';
import { CartListComponent } from './cart-list/cart-list.component';
import { PricesComponent } from './prices/prices.component';
import { UtilityModule } from 'src/app/usablemodules/utility.module';
import { CartComponent } from './cart.component';
import { PaymentComponent } from './payment/payment.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CartComponent,
    CartListComponent,
    PricesComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    UtilityModule,
    CartRoutingModule,
    FormsModule,
    StoreModule.forFeature('cart',cartReducer)
  ]
})
export class CartModule { }
