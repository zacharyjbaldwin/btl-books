import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book.model';

interface CartDto {
  message: string;
  cart: {
    owner: string,
    contents: { item: Book, quantity: number }[]
  }
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public subtotal: number = 0;
  public shippingPrice: number = 0;
  public tax: number = 0;
  public totalPrice: number = 0;

  constructor(
    private http: HttpClient
  ) { }

  public setSubtotal(price: number) {
    this.subtotal = price;
  }

  public setShippingPrice(price: number) {
    this.shippingPrice = price;
  }

  public setTax(price: number) {
    this.tax = price;
  }

  public setTotalPrice(price: number) {
    this.totalPrice = price;
  }

  public getSubtotal() {
    return this.subtotal;
  }

  public getShippingPrice() {
    return this.shippingPrice;
  }

  public getTax() {
    return this.tax;
  }

  public getTotalPrice() {
    return this.totalPrice;
  }

  public getCart(userId: string) {
    return this.http.get<CartDto>(`${environment.apiUrl}/api/cart/${userId}`)
      .pipe(
        map((res) => { return res.cart })
      );
  }

  public setQuantity(bookId: string, quantity: number) {
    return this.http.put(`${environment.apiUrl}/api/cart/${bookId}`, { 'quantity': quantity });
  }

  public addToCart(bookId: string) {
    return this.http.post(`${environment.apiUrl}/api/cart`, { 'itemId': bookId });
  }
}
