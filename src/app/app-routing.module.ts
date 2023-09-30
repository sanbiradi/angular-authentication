import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './home/profile/profile.component';
import { HomeComponent } from './home/home.component';
import { UnauthorisedComponent } from './unauthorised/unauthorised.component';
import { CreateuserComponent } from './user/createuser/createuser.component';
import { ListUsersComponent } from './user/list-users/list-users.component';
import { EditUserinfoComponent } from './user/edit-userinfo/edit-userinfo.component';
import { AuthGuard } from './auth/auth-guard.service';
import { ForgotpasswordComponent } from './auth/forgotpassword/forgotpassword.component';
import { ResetchangepasswordComponent } from './auth/resetchangepassword/resetchangepassword.component';
import { ResetPasswordGuard } from './reset-password.guard';
import { SettingsComponent } from './settings/settings/settings.component';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { VerifyEmailComponent } from './settings/verify-email/verify-email.component';
import { ValidateEmailComponent } from './settings/validate-email/validate-email.component';
// import { VisualizerComponent } from './auth/visualizer/visualizer.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'auth/reset-password', component: ResetchangepasswordComponent, canActivate: [ResetPasswordGuard] },
  // after login routes
  
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

  {
    path: 'settings', component: SettingsComponent, canActivate: [AuthGuard], children: [
      { path: 'changepassword', component: ChangePasswordComponent, pathMatch: 'full' },
      { path: 'verify-account', component: VerifyEmailComponent, pathMatch: 'full'}
    ]
  },
  { path: 'manage-user', component: ListUsersComponent, canActivate: [AuthGuard] },
  { path: 'edit-user/:id', component: EditUserinfoComponent, canActivate: [AuthGuard] },
  { path: 'user-profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'create-user', component: CreateuserComponent, canActivate: [AuthGuard] },
  { path: 'auth/verify-email', component: ValidateEmailComponent },
  { path: 'unauthorized', component: UnauthorisedComponent },
  { path: '**', redirectTo: '/unauthorized' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
