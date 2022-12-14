export interface Book {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  summary: string;
  isbn13: string;
  price: number;
  quantityInStock: number;
  imageUrl: string;
}
