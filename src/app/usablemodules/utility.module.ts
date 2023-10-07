import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertMessageComponent } from '../alert-message/alert-message.component';
import { HeaderComponent } from '../header/header.component';


@NgModule({
  declarations: [AlertMessageComponent,HeaderComponent],
  imports: [
    CommonModule
  ],
  exports:[AlertMessageComponent,HeaderComponent]
})
export class UtilityModule { }
