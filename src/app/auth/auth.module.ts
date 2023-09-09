import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, NgForm } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { NgxCaptchaModule } from 'ngx-captcha';




@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    VisualizerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxCaptchaModule
  ],
  exports:[
    RegisterComponent,
    LoginComponent,
    HeaderComponent
  ]
})
export class AuthModule { }
