import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertMessageComponent } from '../alert-message/alert-message.component';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { DescriptionPipe } from '../pip/description.pip';


@NgModule({
  declarations: [AlertMessageComponent, HeaderComponent, DescriptionPipe],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [AlertMessageComponent, HeaderComponent, DescriptionPipe]
})
export class UtilityModule { }
