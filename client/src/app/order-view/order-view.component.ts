import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrderDTO } from '../models/order.model';
import { OrderService } from '../services/order.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {

  public loading = true;
  public orderId: string = '';
  public order!: OrderDTO;
  public status: string[] = ['Pending', 'Canceled', 'Shipped'];
  public cardType: string[] = ['VISA', 'MasterCard', 'Discover', 'American Express'];
  public error: boolean = false;
  public webAppUrl = environment.webAppUrl;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {
    this.orderId = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.params['id'];
    this.orderService.getOrderById(this.orderId).subscribe((order) => {
      console.log(order);
      this.order = order;
      this.loading = false;
    }, (error) => {
      this.loading = false;
      this.error = true;
    });
  }

  public print(): void {
    window.print();
  }
}
