import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SeeOrdersComponent } from '../see-orders/see-orders.component';
import { UtilityModule } from 'src/app/usablemodules/utility.module';

@NgModule({
  declarations: [

    SeeOrdersComponent,
  ],
  imports: [
    CommonModule, UtilityModule, NgxPaginationModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
