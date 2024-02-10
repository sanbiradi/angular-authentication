import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { OrdersService } from '../services/orders/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent {


  orders: any;
  selectedCategory: any;
  selectedLimit: any = 20;
  pagination: any = 1;
  itemsPerPage: any = this.selectedLimit / 2;
  totalResults!: number;


  filters: any = {
    limit: this.selectedLimit,
    page: this.pagination
  }

  ngOnInit() {
    this.fetchOrders();
  }

  constructor(private orderService: OrdersService, private toastr: ToastrService) {

  }

  fetchOrders() {
    this.orderService.getCustomersOrders(this.filters).subscribe(data => {
      this.orders = data;
      this.totalResults = data.totalResults;
    }, error => {
      this.toastr.error("", error, {
        timeOut: 2000
      })
    })
  }



  showSweetAlert(message: any): Promise<boolean> {
    return Swal.fire({
      title: 'Are you sure?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  async cancelOrder(id: any,action:any) {
    let isConfirm = await this.showSweetAlert(`You want to cancel this order.`);
    if (isConfirm == true) {
      this.orderService.cancelOrderRequest(id,action).subscribe(data => {
        Swal.fire(`Your order is cancelled successfully`);
        this.fetchOrders()
      }, error => {
        this.toastr.error("", error);
      })
    }
  }


  renderPage(event: any) {
    this.pagination = event;
    this.filters.page = this.pagination
    this.fetchOrders();
    console.log(this.pagination)
  }

  
}
