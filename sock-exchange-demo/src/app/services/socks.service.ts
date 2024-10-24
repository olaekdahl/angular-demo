import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocksService {
  // // Mocking database response with an Observable
  // getSocks(): any[] {
  //   const mockSocks = [
  //     { name: 'Rainbow Sock', color: 'Rainbow', size: 'M', price: 12.99 },
  //     { name: 'Blue Stripe Sock', color: 'Blue', size: 'L', price: 9.99 },
  //     { name: 'Green Polka Sock', color: 'Green', size: 'S', price: 10.99 }
  //   ];
  //   return mockSocks;
  // }

  private readonly apiUrl = 'http://localhost:3000/api/products';

  constructor(private readonly http: HttpClient) {}

  // Fetching socks data from the Express API
  getSocks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}