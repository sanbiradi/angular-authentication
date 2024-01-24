import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileInformationComponent } from './profile-information.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ManageAddressesComponent } from './manage-addresses/manage-addresses.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { customerLoginGuard } from 'src/app/guard/customer-login.guard';
import { UnauthorisedComponent } from 'src/app/unauthorised/unauthorised.component';
const routes: Routes = [
  {
    path: 'shop/profile',
    component: ProfileInformationComponent,
    canActivate: [customerLoginGuard],
    children: [
      {
        path: 'update-profile',
        component: UpdateProfileComponent
      },
      {
        path: 'manage-addresses',
        component: ManageAddressesComponent
      },
      {
        path: 'account-settings',
        component: ChangePasswordComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: "unauthorized"
  },
  {
    path: "unauthorized",
    component: UnauthorisedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileInformationRoutingModule { }
