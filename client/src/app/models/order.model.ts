import { CardType } from "../shared/card-type.enum";
import { OrderStatus } from "../shared/order-status.enum";
import { Book } from "./book.model";

export interface Order {
  _id?: string;
  creator: string;
  contents: { bookId: string, quantity: number }[];
  status: OrderStatus;
  address: {
    sendTo: string;
    addrLine1: string;
    addrLine2?: string;
    city: string;
    state: string;
    zip: number;
  };
  cardType: CardType;
  last4CardDigits: number;
  subtotal: number;
  tax: number;
  totalPrice: number;
  shippingPrice: number;
  timestamp: string;
}

export interface OrderDTO {
  addrLine1: string;
  addrLine2?: string;
  cardType: number;
  city: string;
  contents: {
    item: Book,
    quantity: number
  }[];
  creator: string;
  last4CardDigits: number;
  sendTo: string;
  shippingPrice: number;
  state: string;
  status: OrderStatus;
  subtotal: number;
  tax: number;
  timestamp: string;
  totalPrice: number;
  zip: string;
  _id: string;
}