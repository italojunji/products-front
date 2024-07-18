import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `${this.environment.apiUrl}/products`;

  private username = `${this.environment.username}`;
  private password = `${this.environment.password}`;

  private headers: HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json',
    'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
      });

  constructor(private httpClient: HttpClient,
    @Inject('environment') private environment: any
  ) {}

  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.apiUrl, product, {
      headers: this.headers
    });
  }

  updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(this.apiUrl, product, {
      headers: this.headers
    });
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiUrl, {
      headers: this.headers
    });
  }

  deleteProduct(id: Number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<void>(url, {
      headers: this.headers
    }).pipe(
      catchError((error: HttpErrorResponse) => {
          alert(error.error);
          return throwError(() =>'Something went wrong...');
      })
  );
  }
}
