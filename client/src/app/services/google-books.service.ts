import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface GBSBook {
  title: String;
  author: String;
  genre: String;
  description: String;
  isbn: number;
  suggestedPrice: number;
  thumbnailUrl: String;
}

export interface GBSDto {
  message: String;
  count: number;
  books: GBSBook[];
}

@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {

  constructor(
    private http: HttpClient
  ) { }

  public searchGBS(query: String) {
    return this.http.get<GBSDto>(`${environment.apiUrl}/api/gbs/${query}`);
  }
}
