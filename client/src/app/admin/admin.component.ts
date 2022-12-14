import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { AddBookGoogleApiModalComponent } from '../modals/add-book-google-api-modal/add-book-google-api-modal.component';
import { AddBookModalComponent } from '../modals/add-book-modal/add-book-modal.component';
import { ConfirmDeleteModalComponent } from '../modals/confirm-delete-modal/confirm-delete-modal.component';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  public books: Book[] = [];
  private subs = new Subscription();
  public unreadOrders = 0;

  public addBookModal?: BsModalRef;
  public addBookGoogleAPIModal?: BsModalRef;
  public deleteBookModal?: BsModalRef;

  constructor(
    private bookService: BookService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) { }

  deleteBook(index: number) {
    const book = this.bookService.getBookAtIndex(index);
    this.deleteBookModal = this.modalService.show(ConfirmDeleteModalComponent, { class: 'modal-md', initialState: { title: book.title } });
    this.subs.add((this.deleteBookModal.content as ConfirmDeleteModalComponent).confirm.subscribe(() => {
      this.bookService.deleteBook(index);
    }));
  }

  editBook(index: number) {
    const book = this.bookService.getBookAtIndex(index);
    this.addBookModal = this.modalService.show(AddBookModalComponent, { class: 'modal-xl', initialState: { book: book } });
  }

  ngOnInit(): void {
    this.subs.add(this.bookService.getBooks().subscribe((books => {
      this.books = books;
    })))

    this.subs.add(this.bookService.booksListChanged.subscribe((books) => {
      this.books = books;
    }));

    this.subs.add(this.bookService.booksListLoadFailure.subscribe((failed) => {
      if (failed) {
        this.toastr.error('Failed to load books. Please try again later.');
      }
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  openAddBookModal() {
    this.addBookModal = this.modalService.show(AddBookModalComponent, { class: 'modal-xl' });
  }

  openGoogleAPIBookAddModal() {
    this.addBookGoogleAPIModal = this.modalService.show(AddBookGoogleApiModalComponent, { class: 'modal-lg' });
    (this.addBookGoogleAPIModal.content as AddBookGoogleApiModalComponent);
  }

  updateUnreadCount(unreadCount: number) {
    this.unreadOrders = unreadCount;
  }
}
