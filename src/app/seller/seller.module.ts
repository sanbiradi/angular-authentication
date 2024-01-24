import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SellerRoutingModule } from './seller-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { UnauthorisedComponent } from '../unauthorised/unauthorised.component';
// modules
import { RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './settings/settings.module';
import { UserModule } from './user/user.module';
import { ProductsModule } from './products/products.module';
import { SellerComponent } from './seller.component';
import { CommonModule } from '@angular/common';
import { UtilityModule } from '../usablemodules/utility.module';



@NgModule({
  declarations: [UnauthorisedComponent, SellerComponent],
  imports: [
    CommonModule,
    RouterModule,
    AuthModule,
    UtilityModule,
    ProductsModule,
    SettingsModule,
    UserModule,
    BrowserModule,
    HttpClientModule,
    SellerRoutingModule,
  ],
  providers: [
  ],
  exports: [RouterModule],
})
export class SellerModule { }
