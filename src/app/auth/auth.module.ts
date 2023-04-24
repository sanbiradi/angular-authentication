import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthGuard } from './auth-guard.service';
import { HeaderComponent } from './header/header.component';
import { VisualizerComponent } from './visualizer/visualizer.component';





@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    VisualizerComponent
 
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    RegisterComponent,
    LoginComponent,
    HeaderComponent
  ]
})
export class AuthModule { }
