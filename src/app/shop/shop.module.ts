import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { UtilityModule } from '../usablemodules/utility.module';
import { ListProductsComponent } from './list-products/list-products.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { ProfileInformationComponent } from './profile-information/profile-information.component';

import { ProfileInformationModule } from './profile-information/profile-information.module';
@NgModule({
  declarations: [
    ShopComponent,
    ListProductsComponent,
    CustomerRegistrationComponent,
    CustomerLoginComponent,
    ProfileInformationComponent,
   
  ],
  imports: [
    UtilityModule,
    NgxCaptchaModule,
    NgxPaginationModule, 
    ProfileInformationModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ShopRoutingModule,
  ]
})
export class ShopModule { }
