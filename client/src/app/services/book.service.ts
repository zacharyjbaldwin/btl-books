import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, Subject } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  public booksListChanged = new Subject<Book[]>();
  public booksListLoadFailure = new Subject<boolean>();
  public books: Book[] = [];
  public genres: string[] = [];

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.fetchBooks();
  }

  public addBook(book: Book) {
    this.http.post<{ message: string, book: any }>(`${environment.apiUrl}/api/books`, {
      title: book.title,
      author: book.author,
      genre: book.genre,
      summary: book.summary,
      isbn13: book.isbn13,
      price: book.price,
      quantityInStock: book.quantityInStock,
      imageUrl: book.imageUrl
    }).subscribe({
      next: () => {
        this.fetchBooks();
        this.toastr.success(`Added ${book.title}`);
      },
      error: () => {
        this.toastr.error(`Failed to add ${book.title}. Please try again later.`);
      }
    })
  }

  public deleteBook(index: number) {
    const book = this.getBookAtIndex(index);
    this.http.delete(`${environment.apiUrl}/api/books/${book._id}`).subscribe({
      next: () => {
        this.toastr.success(`Deleted ${book.title}`);
        this.fetchBooks();
      },
      error: () => {
        this.toastr.error(`Failed to delete ${book.title}. Please try again later.`);
      }
    });
  }

  public editBook(book: Book): void {
    this.http.put<{ message: string, response: Book }>(`${environment.apiUrl}/api/books/${book._id}`, book).subscribe({
      next: (res) => {
        this.toastr.success('Saved changes!');
        this.fetchBooks();
      },
      error: (error) => {
        this.toastr.error('Failed to save changes. Please try again later.');
      }
    });
  }

  public getBooks(searchQuery?: string, genre?: string, inStockOnly?: boolean, priceMin?: number, priceMax?: number): Observable<Book[]> {
    this.http.get<{ message: string, books: Book[] }>(`${environment.apiUrl}/api/books`).subscribe({
      next: (res) => {

        this.books = res.books;

        if (searchQuery) {
          const query = searchQuery.trim().toLowerCase();
          this.books = this.books.filter((book) => {
            return book.title.toLowerCase().includes(query)
            || book.author.toLowerCase().includes(query)
            || book.genre.toLowerCase().includes(query)
            || book.isbn13.toLowerCase().includes(query);
          });
        }

        if (genre && genre != 'All') {
          this.books = this.books.filter((book) => {
            return book.genre == genre;
          });
        }

        if (inStockOnly) {
          this.books = this.books.filter((book) => {
            return book.quantityInStock > 0;
          });
        }

        if (priceMin) {
          this.books = this.books.filter((book) => {
            return book.price >= priceMin;
          });
        }

        if (priceMax) {
          this.books = this.books.filter((book) => {
            return book.price <= priceMax;
          });
        }

        this.booksListChanged.next(this.books);
        return of([...this.books]);
      },
      error: (error) => {
        this.booksListLoadFailure.next(true);
        this.toastr.error('Failed to load books. Please try again later.');
      }
    });
    return of([...this.books]);
  }

  private fetchBooks(): void {
    this.http.get<{ message: string, books: Book[] }>(`${environment.apiUrl}/api/books`).subscribe({
      next: (res) => {
        this.books = res.books;
        res.books.forEach((book) => {
          if (!this.genres.includes(book.genre)) {
            this.genres.push(book.genre);
          }
        });
        this.booksListChanged.next(this.books);
      },
      error: (error) => {
        this.booksListLoadFailure.next(true);
        this.toastr.error('Failed to load books. Please try again later.');
      }
    });
  }

  // Do not use this function before fetchBooks() is called!
  public getGenres(): string[] {
    return this.genres;
  }

  // Do not use this function before fetchBooks() is called!
  public getBookAtIndex(index: number): Book {
    return this.books[index];
  }

  // Do not use this function before fetchBooks() is called!
  public getBookById(id: string): Book {
    return this.books.find(b => b._id == id)!;
  }
}
