import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

export interface BookTuple {
  id: string;
  title: string;
  quantity: number;
  price: number;
  priceAll: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public cartContents: BookTuple[] = [];
  public loading = true;
  public subtotal: number = 0;
  public shippingPrice: number = 5;
  public tax: number = 0;
  public totalPrice: number = 0;
  public errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCart();
  }

  private getCart() {
    this.loading = true;
    this.cartContents = [];
    this.totalPrice = 0;
    this.subtotal = 0;
    this.tax = 0;
    this.cartService.getCart(this.authService.getUserId()).subscribe((results) => {
      for (let item of results.contents) {
        this.cartContents.push({ id: item.item._id!, title: item.item.title, quantity: item.quantity, price: item.item.price, priceAll: (item.item.price * item.quantity) });
        this.subtotal += item.quantity * item.item.price;
      }
      this.tax = (this.subtotal * 1.0825) - this.subtotal;
      this.totalPrice = this.subtotal + this.tax + this.shippingPrice;
      this.loading = false;
      this.cartService.setSubtotal(this.subtotal);
      this.cartService.setTax(this.tax);
      this.cartService.setShippingPrice(this.shippingPrice);
      this.cartService.setTotalPrice(this.totalPrice);
    }, (error) => {
      this.errorMessage = 'Failed to load cart. Please try again later.';
      this.toastr.error('Failed to load cart. Please try again later.');
      this.loading = false;
    });
  }

  public setQuantity(bookId: string, quantity: number): void {
    this.cartService.setQuantity(bookId, quantity).subscribe((res) => {
      this.getCart();
    });
  };
}
