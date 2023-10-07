import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsPageComponent } from './products-page/products-page.component';
import { HomeComponent } from '../home/home.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { CreateProductComponent } from './create-product/create-product.component';

const routes: Routes = [
  {
    path: "products", component: ProductsPageComponent, canActivate: [AuthGuard]
  },
  {
    path: "new-product", component: CreateProductComponent, canActivate: [AuthGuard]
  }
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
