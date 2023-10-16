import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsPageComponent } from '../products/products-page/products-page.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.service';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { RegisterComponent } from './register/register.component';
import { ResetchangepasswordComponent } from './resetchangepassword/resetchangepassword.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetPasswordGuard } from '../reset-password.guard';
import { LoginGuard } from './login.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate:[LoginGuard]},
  { path: 'forgotpassword', component: ForgotpasswordComponent, canActivate:[LoginGuard]},
  { path: 'register', component: RegisterComponent, canActivate:[LoginGuard] },
  { path: 'auth/reset-password', component: ResetchangepasswordComponent, canActivate: [ResetPasswordGuard] },
  { path: 'user-profile', component: ProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
