import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthorisedComponent } from './unauthorised/unauthorised.component';
import { AuthGuard } from './auth/auth-guard.service';
import { ProductsPageComponent } from './products/products-page/products-page.component';


const routes: Routes = [
  //lazy loaded modules
  { path: '', component: ProductsPageComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/unauthorized' },
  { path: 'unauthorized', component: UnauthorisedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
