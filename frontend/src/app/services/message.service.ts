import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { LoggedInUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private http = inject(HttpClient);

  getMessageUsers() {
    return this.http.get<LoggedInUser[]>('/api/v1/messages/users');
  }
}
