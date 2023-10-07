import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPageComponent } from './products-page/products-page.component';
import { UtilityModule } from '../usablemodules/utility.module';
import { CreateProductComponent } from './create-product/create-product.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductsPageComponent,
    CreateProductComponent
  ],
  imports: [
    CommonModule,UtilityModule,
    FormsModule
  ]
})
export class ProductsModule { }
