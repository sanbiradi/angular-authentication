import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPageComponent } from './products-page/products-page.component';
import { UtilityModule } from '../usablemodules/utility.module';
import { CreateProductComponent } from './create-product/create-product.component';
import { FormsModule } from '@angular/forms';
import { UpdateProductComponent } from './update-product/update-product.component';


@NgModule({
  declarations: [
    ProductsPageComponent,
    CreateProductComponent,
    UpdateProductComponent
  ],
  imports: [
    CommonModule,UtilityModule,
    FormsModule
  ]
})
export class ProductsModule { }
