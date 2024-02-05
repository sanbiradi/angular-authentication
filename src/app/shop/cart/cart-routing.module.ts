import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { CartComponent } from './cart.component';
import { CustomerGuard } from '../guards/customer.guard';
const routes: Routes = [

  { path: '', component: CartComponent },
  { path: 'confirm/:id', component: PaymentComponent, canActivate: [CustomerGuard] }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
