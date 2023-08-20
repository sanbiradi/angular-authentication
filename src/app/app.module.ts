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
// import { HomeComponent } from './home/home.component';





@NgModule({
  declarations: [AppComponent, UnauthorisedComponent, CreateuserComponent, ListUsersComponent, EditUserinfoComponent],
  imports: [
    FormsModule,
    AppRoutingModule,
    BrowserModule,
    AuthModule,
    HomeModule,
    ReactiveFormsModule,
    HttpClientModule
  
  ],
  
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
