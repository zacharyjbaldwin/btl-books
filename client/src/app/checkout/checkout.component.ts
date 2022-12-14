import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { BookTuple } from '../cart/cart.component';
import { AddAddressModalComponent } from '../modals/add-address-modal/add-address-modal.component';
import { Address } from '../models/address.model';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';
import { CardType } from '../shared/card-type.enum';
import { OrderStatus } from '../shared/order-status.enum';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public cartContents: BookTuple[] = [];
  public addresses: Address[] = [];
  public currentPage: String = 'shipping';
  public deliveryStandard: Date;
  public selectedShippingSpeed: boolean = false;
  public selectedAddress: boolean = false;
  public paymentForm: FormGroup;
  public addAddressModal?: BsModalRef;
  public selectAddressForm: FormGroup = new FormGroup({
    address: new FormControl(null, [Validators.required])
  });
  public cardTypeNames: String[] = ['VISA', 'MasterCard', 'Discover', 'Amex'];
  public addressByAddressId!: Address;
  public addressId: string = '';
  public cardType: CardType = CardType.VISA;
  public last4CardDigits: number = 1234;
  public status: OrderStatus = OrderStatus.Pending;
  public shippingPrice: number = 5;
  public subtotal: number = 0;
  public tax: number = 0;
  public totalPrice: number = 0;

  constructor(
    private authService: AuthService,
    private modalService: BsModalService,
    private userService: UserService,
    private toastr: ToastrService,
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router
  ) {
    this.deliveryStandard = new Date();
    this.deliveryStandard.setDate(this.deliveryStandard.getDate() + 3);

    if (environment.production) {
      this.paymentForm = new FormGroup({
        firstname: new FormControl(null, [Validators.required]),
        lastname: new FormControl(null, [Validators.required]),
        cardType: new FormControl(0, [Validators.required]),
        cardNumber: new FormControl(null, [Validators.required, Validators.min(1000000000000000), Validators.max(9999999999999999)]),
        cvv: new FormControl(null, [Validators.required, Validators.min(100), Validators.max(999)]),
        expireMonth: new FormControl('january', [Validators.required]),
        expireYear: new FormControl(2022, [Validators.required, Validators.min(1000), Validators.max(9999)])
      });
    } else {
      this.paymentForm = new FormGroup({
        firstname: new FormControl('Dev firstname', [Validators.required]),
        lastname: new FormControl('Dev lastname', [Validators.required]),
        cardType: new FormControl(0, [Validators.required]),
        cardNumber: new FormControl(1234567891234567, [Validators.required, Validators.min(1000000000000000), Validators.max(9999999999999999)]),
        cvv: new FormControl(123, [Validators.required, Validators.min(100), Validators.max(999)]),
        expireMonth: new FormControl('january', [Validators.required]),
        expireYear: new FormControl(2022, [Validators.required, Validators.min(1000), Validators.max(9999)])
      });
    }
    this.fetchAddresses();
  }

  ngOnInit(): void {
    if (this.cartService.getSubtotal() == 0) {
      this.router.navigate(['/cart']);
    }
  }

  changePage(page: String) {
    this.currentPage = page;
  }

  selectedInput() {
    this.selectedShippingSpeed = true;
  }

  selectAddress() {
    this.addressId = this.selectAddressForm.value.address;
    this.addressByAddressId = this.addresses.find(a => a._id == this.addressId)!;
    this.changePage('card');
  }

  openAddAddressModal() {
    this.addAddressModal = this.modalService.show(AddAddressModalComponent, { class: 'modal-md' });
    (this.addAddressModal.content as AddAddressModalComponent).affirm.subscribe((res: Address) => {
      const address: Address = {
        sendTo: res.sendTo,
        addrLine1: res.addrLine1,
        addrLine2: (res.addrLine2 ? res.addrLine2 : undefined),
        city: res.city,
        state: res.state,
        zip: res.zip
      };
      this.addAddress(address);
    });
  }

  addAddress(address: Address) {
    this.userService.addAddress(address).subscribe((res) => {
      this.toastr.success('Added address.');
      this.fetchAddresses();
    });
  }

  private fetchAddresses() {
    this.userService.getAddressesById(this.authService.getUserId()).subscribe((addresses: Address[]) => {
      this.addresses = addresses;
    });
  }

  goToReview() {
    this.currentPage = 'loading';
    this.cardType = this.paymentForm.value.cardType;
    this.last4CardDigits = +this.paymentForm.value.cardNumber.toString().slice(-4);
    this.status = OrderStatus.Pending;
    this.shippingPrice = 5;
    this.subtotal = this.cartService.getSubtotal();
    this.tax = this.cartService.getTax();
    this.totalPrice = this.cartService.getTotalPrice();

    this.cartService.getCart(this.authService.getUserId()).subscribe((results) => {
      for (let item of results.contents) {
        this.cartContents.push({ id: item.item._id!, title: item.item.title, quantity: item.quantity, price: item.item.price, priceAll: (item.item.price * item.quantity) });
      }
      this.currentPage = 'review';
    });
  }

  placeOrder() {
    this.currentPage = 'loading';
    this.orderService.createOrder(this.addressId, this.cardType, this.last4CardDigits, this.status, this.shippingPrice, this.subtotal, this.tax, this.totalPrice).subscribe((response) => {
      this.currentPage = 'success';
      this.toastr.success('Order placed!');
    }, (error) => {
      this.currentPage = 'review'
      this.toastr.error('There was an error placing your order. Please try again later.')
    });
  }
}
