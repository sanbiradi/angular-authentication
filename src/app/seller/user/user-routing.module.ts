import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { AuthGuard } from '../services/auth-guard.service';
import { EditUserinfoComponent } from './edit-userinfo/edit-userinfo.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { ValidateEmailComponent } from '../settings/validate-email/validate-email.component';

const routes: Routes = [
  { path: 'manage-user', component: ListUsersComponent, canActivate: [AuthGuard] },
  { path: 'edit-user/:id', component: EditUserinfoComponent, canActivate: [AuthGuard] },
  { path: 'create-user', component: CreateuserComponent, canActivate: [AuthGuard] },
  { path: 'auth/verify-email', component: ValidateEmailComponent, canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
