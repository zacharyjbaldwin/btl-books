import { Component, OnInit } from '@angular/core';
import { OrderDTO } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  public webAppUrl = environment.webAppUrl;
  public loading: boolean = true;
  public orders: OrderDTO[] = [];
  public status: string[] = ['Pending', 'Canceled', 'Shipped'];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loading = true;
    this.orderService.getMyOrders().subscribe((orders) => {
      this.loading = false;
      this.orders = orders;
    });
  }
}
