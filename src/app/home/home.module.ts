import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { AuthModule } from "../auth/auth.module";
// import { HeaderComponent } from '../auth/header/header.component';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';



@NgModule({
    declarations: [
        ProfileComponent,
        HomeComponent
    ],
    exports: [
        ProfileComponent
    ],
    imports: [
      AuthModule,
      CommonModule,
      FormsModule
    ]
})
export class HomeModule { }
