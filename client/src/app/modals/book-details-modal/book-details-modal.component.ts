import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-book-details-modal',
  templateUrl: './book-details-modal.component.html',
  styleUrls: ['./book-details-modal.component.scss']
})
export class BookDetailsModalComponent implements OnInit, OnDestroy {

  public book!: Book;
  public id: string = '';

  private loginModal?: BsModalRef;
  private subs = new Subscription();

  constructor(
    private authService: AuthService,
    private bookService: BookService,
    private cartService: CartService,
    private modalRef: BsModalRef,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.book = this.bookService.getBookById(this.id);
  }

  closeModal() {
    this.modalRef.hide();
  }

  addToCart(bookId: string) {
    if (!this.authService.getIsAuthenticated()) {
      this.loginModal = this.modalService.show(LoginModalComponent);
      this.subs.add((this.loginModal.content as LoginModalComponent).loggedIn.subscribe(() => {
        this.subs.add(this.cartService.addToCart(bookId).subscribe({
          next: () => {
            this.toastr.success('Added to cart!');
          },
          error: () => {
            this.toastr.error('Failed to add book to cart!');
          }
        }));
      }));
    } else {
      this.subs.add(this.cartService.addToCart(bookId).subscribe({
        next: () => {
          this.toastr.success('Added to cart!');
        },
        error: () => {
          this.toastr.error('Failed to add book to cart!');
        }
      }));
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
