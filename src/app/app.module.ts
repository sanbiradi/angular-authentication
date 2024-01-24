import { NgModule } from '@angular/core';
import { SellerModule } from './seller/seller.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { ShopModule } from './shop/shop.module';
import { CustomCurrencyPipe } from './pip/custom-currency.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CustomCurrencyPipe,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ShopModule,
    SellerModule
  ],
  providers: [
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
