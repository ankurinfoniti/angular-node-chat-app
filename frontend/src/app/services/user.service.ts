import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { User, tokenUser } from '../models/user.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);

  getAllUsers(): Observable<User[]> {
    // get current login user
    const token = this.auth.getToken();
    let loggedInUser: tokenUser = { id: '', name: '', email: '' };

    if (token) {
      loggedInUser = this.auth.decodeToken(token);
    }

    return this.http.post<User[]>('/api/v1/users', { ...loggedInUser });
  }
}
