import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `${this.environment.apiUrl}/products`;

  private username = 'super';
  private password = 'super';

  private headers: HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json',
    'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
      });

  constructor(private httpClient: HttpClient,
    @Inject('environment') private environment: any
  ) {}

  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.apiUrl, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(this.apiUrl, product);
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiUrl, {
      headers: this.headers
    });
  }

  deleteProduct(id: Number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<void>(url);
  }
}
