import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = `${this.environment.apiUrl}/categories`;

  private username = `${this.environment.username}`;
  private password = `${this.environment.password}`;

  private headers: HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json',
    'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
      });

  constructor(private httpClient: HttpClient,
    @Inject('environment') private environment: any
  ) {}

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.apiUrl, {
      headers: this.headers
    });
  }
}
