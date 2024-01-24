import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { CreateuserComponent } from './createuser/createuser.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { EditUserinfoComponent } from './edit-userinfo/edit-userinfo.component';
import { UtilityModule } from '../../usablemodules/utility.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateuserComponent, ListUsersComponent, EditUserinfoComponent
  ],
  imports: [
    CommonModule,
    UtilityModule,
    FormsModule,
    UserRoutingModule
  ]
})
export class UserModule { }
