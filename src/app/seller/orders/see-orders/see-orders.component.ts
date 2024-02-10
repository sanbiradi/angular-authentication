import { Component, OnInit, Renderer2 } from '@angular/core';
import Order from './order'
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/shop/services/order/order.service';
import Swal from 'sweetalert2';
import { OrdersService } from '../../services/orders/orders.service';
@Component({
  selector: 'app-see-orders',
  templateUrl: './see-orders.component.html',
  styleUrls: ['./see-orders.component.scss']
})
export class SeeOrdersComponent implements OnInit {

  orderId!: string;
  order!: Order;
  items: any;
  Address!: string;
  orderCreatedAt = new Date();
  orderUpdatedAt = new Date();

  constructor(private renderer: Renderer2, private toastr: ToastrService, private activatedRouter: ActivatedRoute, private orderService: OrdersService) {
    this.hideRecaptchaBadge()
  }

  getOrderDetails() {
    const id = this.activatedRouter.snapshot.paramMap.get("id");
    if (id) {
      this.orderId = id;
      this.orderService.getCustomerOrderDetails(this.orderId).subscribe({
        next: (data: any) => {
          this.order = data[0];

          let add = this.order.address;
          if (add)
            this.Address = `${add.street} ${add.addressLine2}, ${add.city} ${add.state}, ${add.pin} `
        },
        error: (error: any) => {
          this.toastr.error(error, '', { timeOut: 2000 });
        }
      });
    }
  }

  confirmedCheck: any;
  ngOnInit() {
    this.hideRecaptchaBadge()
    this.getOrderDetails()
    this.confirmedCheck = this.order.status !== 'Confirmed' && (this.order.status !== 'Cancelled') && this.order.paymentStatus!=='Paid' ? true : false;
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

  private hideRecaptchaBadge(): void {
    const badge = document.querySelector('.grecaptcha-badge');
    if (badge) {
      this.renderer.setStyle(badge, 'display', 'none');
    }
  }

  async orderAction(id: any,action:any) {
    let isConfirm = await this.showSweetAlert(`You want to cancel this order.`);

    if (isConfirm == true) {
      this.orderService.cancelOrderRequest(id,action).subscribe(data => {
        Swal.fire(`Your order is cancelled successfully`);
        this.getOrderDetails();
      }, error => {
        this.toastr.error("", error);
      })
    }
  }

}
