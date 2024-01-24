import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthGuard } from '../services/auth-guard.service';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [
  {
    path: 'settings', component: SettingsComponent, canActivate: [AuthGuard], children: [
      { path: 'changepassword', component: ChangePasswordComponent, pathMatch: 'full' },
      { path: 'verify-account', component: VerifyEmailComponent, pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
