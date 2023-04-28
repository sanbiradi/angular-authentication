import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [AppComponent],
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
