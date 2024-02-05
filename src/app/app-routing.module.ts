import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './shop/list-products/list-products.component';
import { CustomerRegistrationComponent } from './shop/customer-registration/customer-registration.component';
import { CustomerLoginComponent } from './shop/customer-login/customer-login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'shop',
    pathMatch: 'full',
  },
  {
    path: 'customer/register',
    component: CustomerRegistrationComponent
  },
  {
    path: 'customer/login',
    component: CustomerLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
