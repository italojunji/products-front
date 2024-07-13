import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Product} from 'app/models/product';
import {Observable} from 'rxjs';
export class ProductServiceApi {

  private urlBase: string;

  private headers: HttpHeaders = new HttpHeaders({
  'Content-type': 'application/json',
    });

  constructor(
    private httpClient: HttpClient,

    ) {
      this.urlBase = 'http://localhost:8081'
    }
  public findAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.urlBase}`, {
        headers: this.headers
      });
    }

  }
