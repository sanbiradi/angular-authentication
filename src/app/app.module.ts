import { NgModule } from '@angular/core';
import { SellerModule } from './seller/seller.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { ShopModule } from './shop/shop.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { StoreModule } from '@ngrx/store';
import { DatePipe } from './pip/date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DatePipe,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),
    StoreModule.forRoot({}),
    SellerModule,
    ShopModule
  ],
  providers: [
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
