import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleProductComponent } from './single-product/single-product.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './cart/payment/payment.component';
import { OrdersComponent } from './orders/orders.component';
import { ShopComponent } from './shop.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';

const routes: Routes = [
  {
    path: 'shop',
    component: ShopComponent,
    children: [
      {
        path: '',
        component: ListProductsComponent
      },
      {
        path: 'viewproduct/:id',
        component: SingleProductComponent
      },
      {
        path: 'cart',
        loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)
      },
      {
        path: 'cart',
        component:CartComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'orders/:id',
        component: ViewOrdersComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
