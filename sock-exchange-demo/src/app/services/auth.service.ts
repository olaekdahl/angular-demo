// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post('http://localhost:3000/api/login', { username, password });
  }

  logout() {
    localStorage.removeItem('token');
  }
}