import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { GBSBook } from 'src/app/services/google-books.service';

@Component({
  selector: 'app-add-book-modal',
  templateUrl: './add-book-modal.component.html',
  styleUrls: ['./add-book-modal.component.scss']
})
export class AddBookModalComponent implements OnInit {

  public addBookForm!: FormGroup;
  public summaryLength: number = 0;
  public book?: Book;
  public gbsBook?: GBSBook;

  constructor(
    public bookService: BookService,
    public modalRef: BsModalRef,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.book) {
      this.addBookForm = new FormGroup({
        title: new FormControl(this.book.title, [Validators.required]),
        author: new FormControl(this.book.author, [Validators.required]),
        genre: new FormControl(this.book.genre, [Validators.required]),
        isbn13: new FormControl(this.book.isbn13, [Validators.required, Validators.min(1111111111), Validators.max(9999999999999), Validators.pattern(/\d{13}|\d{10}/)]),
        imageUrl: new FormControl(this.book.imageUrl, [Validators.required, Validators.pattern(/https?:\/\/.+\.(png|jpg|jpeg)/)]),
        price: new FormControl(this.book.price, [Validators.required, Validators.min(1)]),
        quantityInStock: new FormControl(this.book.quantityInStock, [Validators.required, Validators.min(0)]),
        summary: new FormControl(this.book.summary, [Validators.required, Validators.maxLength(500)])
      });
    } else if (this.gbsBook) {
      this.addBookForm = new FormGroup({
        title: new FormControl(this.gbsBook.title, [Validators.required]),
        author: new FormControl(this.gbsBook.author, [Validators.required]),
        genre: new FormControl(this.gbsBook.genre, [Validators.required]),
        isbn13: new FormControl(this.gbsBook.isbn, [Validators.required, Validators.min(1111111111), Validators.max(9999999999999), Validators.pattern(/\d{13}|\d{10}/)]),
        imageUrl: new FormControl(this.gbsBook.thumbnailUrl, [Validators.required]),
        price: new FormControl((this.gbsBook.suggestedPrice > 0 ? this.gbsBook.suggestedPrice : ''), [Validators.required, Validators.min(1)]),
        quantityInStock: new FormControl(null, [Validators.required, Validators.min(0)]),
        summary: new FormControl(this.gbsBook.description, [Validators.required, Validators.maxLength(500)])
      });

      this.calculateLength();
    } else {
      this.addBookForm = new FormGroup({
        title: new FormControl(null, [Validators.required]),
        author: new FormControl(null, [Validators.required]),
        genre: new FormControl(null, [Validators.required]),
        isbn13: new FormControl(null, [Validators.required, Validators.min(1111111111), Validators.max(9999999999999), Validators.pattern(/\d{13}|\d{10}/)]),
        imageUrl: new FormControl(null, [Validators.required, Validators.pattern(/https?:\/\/.+\.(png|jpg|jpeg)/)]),
        price: new FormControl(null, [Validators.required, Validators.min(1)]),
        quantityInStock: new FormControl(null, [Validators.required, Validators.min(0)]),
        summary: new FormControl(null, [Validators.required, Validators.maxLength(500)])
      });
    }

    this.bookService.booksListChanged.subscribe(() => {
      this.modalRef.hide();
    });
  }

  onSubmit() {
    const book: Book = {
      title: this.addBookForm.value.title,
      author: this.addBookForm.value.author,
      genre: this.addBookForm.value.genre,
      summary: this.addBookForm.value.summary,
      isbn13: this.addBookForm.value.isbn13,
      price: this.addBookForm.value.price,
      quantityInStock: this.addBookForm.value.quantityInStock,
      imageUrl: this.addBookForm.value.imageUrl
    };

    if (this.book) {
      book._id = this.book._id;
      this.bookService.editBook(book);
    } else {
      this.bookService.addBook(book);
    }
  }

  calculateLength() {
    this.summaryLength = this.addBookForm.value.summary.length;
  }

  closeModal() {
    this.modalRef.hide();
  }
}
