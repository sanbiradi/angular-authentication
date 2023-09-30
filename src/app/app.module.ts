import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { UnauthorisedComponent } from './unauthorised/unauthorised.component';
import { CreateuserComponent } from './user/createuser/createuser.component';
import { ListUsersComponent } from './user/list-users/list-users.component';
import { EditUserinfoComponent } from './user/edit-userinfo/edit-userinfo.component';
import { UtilityModule } from './usablemodules/utility.module';
import { SettingsComponent } from './settings/settings/settings.component';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { VerifyEmailComponent } from './settings/verify-email/verify-email.component';
import { ValidateEmailComponent } from './settings/validate-email/validate-email.component';



@NgModule({
  declarations: [AppComponent, UnauthorisedComponent, CreateuserComponent, ListUsersComponent, EditUserinfoComponent, SettingsComponent, ChangePasswordComponent, VerifyEmailComponent, ValidateEmailComponent],
  imports: [
    AuthModule,
    HomeModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    UtilityModule,
  ],
  providers: [
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
