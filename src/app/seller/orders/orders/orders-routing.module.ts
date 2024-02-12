import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from '../orders.component';
import { SeeOrdersComponent } from '../see-orders/see-orders.component';

const routes: Routes = [
  { path: 'orders', component: OrdersComponent },
  { path: 'orders/:id', component: SeeOrdersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
