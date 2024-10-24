import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly apiUrl = 'http://localhost:3000/api/protected/products';

  constructor(private readonly http: HttpClient) {}

  // Fetching socks data from protected API
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}