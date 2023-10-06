import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

import { LoginUser, TokenUser } from '../models/user.model';
import { Credentials } from '../models/credentials.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  login(credentials: Credentials): Observable<any> {
    return this.http.post('/api/v1/user/login', { ...credentials });
  }

  signup(user: LoginUser): Observable<any> {
    return this.http.post(`/api/v1/user/signup`, { ...user });
  }

  logout() {
    localStorage.removeItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  decodeToken(token: string): TokenUser {
    return jwt_decode(token);
  }
}
