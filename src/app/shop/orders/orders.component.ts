import { Component } from '@angular/core';
import { ShophttpService } from '../services/shophttp/shophttp.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  orders: any;
  ngOnInit() {
    this.fetchOrders();
  }

  constructor(private shophttp: ShophttpService, private toastr: ToastrService) {

  }
  fetchOrders() {
    this.shophttp.getCustomersOrders().subscribe(data => {
      this.orders = data;
    }, error => {
      this.toastr.error("", error, {
        timeOut: 2000
      })
    })
  }
}
