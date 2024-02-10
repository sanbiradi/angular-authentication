import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order/order.service';
import { ToastrService } from 'ngx-toastr';
import Order from './order';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss']
})
export class ViewOrdersComponent {
  orderId!: string;
  order!: Order;
  items: any;

  Address!: string;
  orderCreatedAt = new Date();
  orderUpdatedAt = new Date();

  constructor(private renderer: Renderer2, private toastr: ToastrService, private activatedRouter: ActivatedRoute, private orderService: OrderService) {
    this.hideRecaptchaBadge();
    this.getOrderDetails()
  }

  getOrderDetails() {
    const id = this.activatedRouter.snapshot.paramMap.get("id");
    if (id) {
      this.orderId = id;
      this.orderService.getCustomerOrderDetails(this.orderId).subscribe({
        next: (data: any) => {
          this.order = data;
          let add = this.order.address;
          this.Address = `${add.street} ${add.addressLine2}, ${add.city} ${add.state}, ${add.pin} `
        },
        error: (error: any) => {
          this.toastr.error(error, '', { timeOut: 2000 });
        }
      });
    }
  }

  ngOnInit() {
    this.hideRecaptchaBadge();

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

  async orderCancel(id: any) {
    let isConfirm = await this.showSweetAlert(`You want to cancel this order.`);

    if (isConfirm == true) {
      this.orderService.cancelOrderRequest(id).subscribe(data => {
        Swal.fire(`Your order is cancelled successfully`);
        this.getOrderDetails();
      }, error => {
        this.toastr.error("", error);
      })
    }
  }
}
