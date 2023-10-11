import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertMessageComponent } from '../alert-message/alert-message.component';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [AlertMessageComponent,HeaderComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[AlertMessageComponent,HeaderComponent]
})
export class UtilityModule { }
