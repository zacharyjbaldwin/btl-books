import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Order, OrderDTO } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
import { OrderStatus } from 'src/app/shared/order-status.enum';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public webAppUrl = environment.webAppUrl;
  public orders: OrderDTO[] = [];
  public loading: boolean = true;
  public unreadOrders: number = 0;

  @Output() public updateUnreadCount = new EventEmitter<number>();

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loading = true;
    this.fetchOrders();
  }

  fetchOrders() {
    this.orderService.getAllOrders().subscribe((orders) => {
      this.unreadOrders = orders.filter(o => o.status == 0).length;
      this.updateUnreadCount.emit(this.unreadOrders);
      this.orders = orders;
      this.loading = false;
    });
  }

  markAsShipped(orderId: String) {
    this.orderService.updateOrderStatus(orderId, OrderStatus.Shipped).subscribe((results) => {
      this.fetchOrders();
    });
    
  }

  cancelOrder(orderId: String) {
    this.orderService.updateOrderStatus(orderId, OrderStatus.Canceled).subscribe((results) => {
      this.fetchOrders();
    });
  }
}
