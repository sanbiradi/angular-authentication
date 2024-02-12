import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './services/auth-guard.service';
import { ProductsPageComponent } from './products/products-page/products-page.component';
import { OrdersComponent } from './orders/orders.component';
import { SeeOrdersComponent } from './orders/see-orders/see-orders.component';


const routes: Routes = [
  // lazy loaded modules
  {
    path: '', component: ProductsPageComponent, canActivate: [AuthGuard],
    
  },

  // { path: '**', redirectTo: '/unauthorized' },
  // { path: 'unauthorized', component: UnauthorisedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class SellerRoutingModule { }
