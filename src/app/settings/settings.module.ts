import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { FormsModule } from '@angular/forms';
import { settingsRoutingModule } from './settings-routing.module';
import { AlertMessageComponent } from '../alert-message/alert-message.component';




@NgModule({
  declarations: [
    ChangePasswordComponent,
    EmailVerificationComponent,
    AlertMessageComponent
  ],
  imports: [
    settingsRoutingModule,
    CommonModule,
    FormsModule
  ]
})
export class SettingsModule { }
