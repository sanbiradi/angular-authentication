import { NgModule } from '@angular/core';
import { SellerModule } from './seller/seller.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { ShopModule } from './shop/shop.module';
import { CustomCurrencyPipe } from './pip/custom-currency.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
    CustomCurrencyPipe,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),
    ShopModule,
    SellerModule,
  ],
  providers: [
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
