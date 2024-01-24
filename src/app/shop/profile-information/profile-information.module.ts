import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInformationRoutingModule } from './profile-information-routing.module';
import { ManageAddressesComponent } from './manage-addresses/manage-addresses.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { FormsModule } from '@angular/forms';
import { UtilityModule } from 'src/app/usablemodules/utility.module';
@NgModule({
  declarations: [
    ManageAddressesComponent,
    ChangePasswordComponent,
    UpdateProfileComponent,
  ],
  imports: [
    FormsModule,
    UtilityModule,
    CommonModule,
    ImageCropperModule,
    ProfileInformationRoutingModule
  ]
})
export class ProfileInformationModule { }
