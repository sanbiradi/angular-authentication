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
import { SettingsComponent } from './settings/settings/settings.component';
import { settingsRoutingModule } from './settings/settings-routing.module';
import { SettingsModule } from './settings/settings.module';





@NgModule({
  declarations: [AppComponent, UnauthorisedComponent, CreateuserComponent, ListUsersComponent, EditUserinfoComponent, SettingsComponent],
  imports: [
    FormsModule,
    settingsRoutingModule,
    AppRoutingModule,
    BrowserModule,
    AuthModule,
    HomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    SettingsModule
  ],
  
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
