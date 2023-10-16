import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UnauthorisedComponent } from './unauthorised/unauthorised.component';

// modules
import { RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './settings/settings.module';
import { UserModule } from './user/user.module';
import { ProductsModule } from './products/products.module';



@NgModule({
  declarations: [AppComponent, UnauthorisedComponent],
  imports: [
    AuthModule,
    ProductsModule,
    SettingsModule,
    UserModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
