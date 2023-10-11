import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsPageComponent } from './products-page/products-page.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { CreateProductComponent } from './create-product/create-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';

const routes: Routes = [
  { path: "products", component: ProductsPageComponent, canActivate: [AuthGuard]},
  { path: "products/new-product", component: CreateProductComponent, canActivate: [AuthGuard]},
  { path: "update/:id", component: UpdateProductComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [
    RouterModule
  ]
})

export class ProductsRoutingModule { }
