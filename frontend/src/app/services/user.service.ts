import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { LoggedInUser, TokenUser } from '../models/user.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);

  getAllUsers(): Observable<LoggedInUser[]> {
    // get current login user
    const token = this.auth.getToken();
    let loggedInUser: TokenUser = { id: '', name: '', email: '' };

    if (token) {
      loggedInUser = this.auth.decodeToken(token);
    }

    return this.http.post<LoggedInUser[]>('/api/v1/users', { ...loggedInUser });
  }
}
