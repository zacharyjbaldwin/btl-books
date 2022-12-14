import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { BookDetailsModalComponent } from '../modals/book-details-modal/book-details-modal.component';
import { LoginModalComponent } from '../modals/login-modal/login-modal.component';
import { Book } from '../models/book.model';
import { AuthService } from '../services/auth.service';
import { BookService } from '../services/book.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-books-catalog',
  templateUrl: './books-catalog.component.html',
  styleUrls: ['./books-catalog.component.scss']
})
export class BooksCatalogComponent implements OnInit, OnDestroy {

  public genres: string[] = [];
  public books: Book[] = [];
  public selectedPage: number = 1;
  public booksPerPage: number = 8;
  public totalBookCount: number = 0;

  public booksLoading: boolean = true;
  public loadingErrorMessage: string = '';

  public searchQuery?: string;
  public genre?: string;
  public inStockOnly?: boolean;
  public priceMin?: number;
  public priceMax?: number;

  private subs = new Subscription();

  private loginModal?: BsModalRef;
  private bookDetailsModal?: BsModalRef;

  constructor(
    private authService: AuthService,
    private bookService: BookService,
    private cartService: CartService,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.booksLoading = true;
    this.subs.add(this.bookService.getBooks().subscribe((books => {
      this.setBooks(books);
    })));

    this.subs.add(this.bookService.booksListChanged.subscribe((books) => {
      this.setBooks(books);
      this.genres = this.bookService.getGenres();
      this.booksLoading = false;
    }));

    this.subs.add(this.bookService.booksListLoadFailure.subscribe((failed) => {
      if (failed) {
        this.booksLoading = false;
        this.loadingErrorMessage = 'Failed to load books. Please try again later.';
      }
    }));
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

  updateFilters() {
    this.searchQuery = this.searchQuery == '' ? undefined : this.searchQuery;
    this.genre = this.genre == 'All' ? 'All' : this.genre;
    this.selectedPage = 1;
    this.subs.add(this.bookService.getBooks(this.searchQuery, this.genre, this.inStockOnly, this.priceMin, this.priceMax).subscribe((books) => {
      this.setBooks(books);
    }));
  }

  clearFilters() {
    this.selectedPage = 1;
    this.searchQuery = '';
    this.genre = 'All';
    this.inStockOnly = false;
    this.priceMax = undefined;
    this.priceMin = undefined;
    this.updateFilters();
  }

  viewDetails(index: number) {
    this.bookDetailsModal = this.modalService.show(BookDetailsModalComponent, { class: 'modal-lg', initialState: { id: this.books[index]._id } });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  changePage(event: PageChangedEvent) {
    this.selectedPage = event.page;

    this.subs.add(this.bookService.getBooks(this.searchQuery, this.genre, this.inStockOnly, this.priceMin, this.priceMax).subscribe((books) => {
      this.setBooks(books);
    }));
  }

  setBooks(books: Book[]) {
    this.totalBookCount = books.length;
    let startpoint = (this.selectedPage - 1) * 8;
    let endpoint = (((this.selectedPage - 1) * 8) + this.booksPerPage) > this.totalBookCount ? this.totalBookCount : (((this.selectedPage - 1) * 8) + this.booksPerPage);
    this.books = books.slice(startpoint, endpoint);
  }
}
