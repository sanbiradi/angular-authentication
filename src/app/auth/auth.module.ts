import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthGuard } from './auth-guard.service';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    RegisterComponent,
    LoginComponent,
  ]
})
export class AuthModule { }
