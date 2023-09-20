import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { UtilityModule } from '../utility.module';
import { ChangepasswordComponent } from './changepassword/changepassword.component';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    VisualizerComponent,
    ForgotpasswordComponent,
    ChangepasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxCaptchaModule,
    UtilityModule
  ],
  exports:[
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
  ]
})
export class AuthModule { }
