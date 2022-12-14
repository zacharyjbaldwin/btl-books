import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GBSBook, GoogleBooksService } from 'src/app/services/google-books.service';
import { AddBookModalComponent } from '../add-book-modal/add-book-modal.component';

@Component({
  selector: 'app-add-book-google-api-modal',
  templateUrl: './add-book-google-api-modal.component.html',
  styleUrls: ['./add-book-google-api-modal.component.scss']
})
export class AddBookGoogleApiModalComponent implements OnInit {

  public showError: boolean = false;
  public foundBooks: GBSBook[] = [];
  public loading: boolean = false;
  public performedSearch: boolean = false;
  public searchBookForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required])
  });
  private confirmAddModal?: BsModalRef;

  constructor(
    private gbsService: GoogleBooksService,
    private modalService: BsModalService,
    private modalRef: BsModalRef
  ) { }

  ngOnInit(): void {
  }

  onSearch() {
    this.performedSearch = true;
    this.loading = true;
    this.gbsService.searchGBS(this.searchBookForm.value.title).subscribe((results) => {
      this.foundBooks = results.books;
      this.loading = false;
      this.showError = false;
    }, (error) => {
      this.loading = false;
      this.foundBooks = [];
      this.showError = true;
    });
  }

  openMissingDetailsModal(book: GBSBook) {
    this.modalRef.hide();
    this.confirmAddModal = this.modalService.show(AddBookModalComponent, { class: 'modal-xl', initialState: {
      gbsBook: book
    }});
  }

}
