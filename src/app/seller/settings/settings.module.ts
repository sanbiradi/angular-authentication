import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { ValidateEmailComponent } from './validate-email/validate-email.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { SettingsComponent } from './settings/settings.component';
import { UtilityModule } from '../../usablemodules/utility.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SettingsComponent, ChangePasswordComponent, VerifyEmailComponent, ValidateEmailComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    UtilityModule,
    FormsModule
  ]
})
export class SettingsModule { }
