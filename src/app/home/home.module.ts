import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { AuthModule } from "../auth/auth.module";
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { UtilityModule } from '../usablemodules/utility.module';


@NgModule({
    declarations: [
        ProfileComponent,
        HomeComponent
    ],
    exports: [
        ProfileComponent,
        HomeComponent  
    ],
    imports: [
      AuthModule,
      CommonModule,
      FormsModule,
      NgxCaptchaModule,
      UtilityModule
    ]
})
export class HomeModule { }
