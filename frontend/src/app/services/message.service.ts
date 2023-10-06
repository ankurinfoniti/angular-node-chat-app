import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { LoggedInUser, TokenUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private selectedUser = signal<TokenUser>(this.getUser());
  getSelectedUser = computed(() => this.selectedUser());

  private http = inject(HttpClient);

  getMessageUsers() {
    return this.http.get<LoggedInUser[]>('/api/v1/messages/users');
  }

  setSelectedUser(user: LoggedInUser) {
    const selectedUser = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    localStorage.setItem('selectedUser', JSON.stringify(selectedUser));
    this.selectedUser.set(selectedUser);
  }

  getUser(): TokenUser {
    /* let selectedUser = localStorage.getItem('selectedUser');

    if (selectedUser) {
      return JSON.parse(selectedUser);
    } */

    return { id: '', name: '', email: '' };
  }
}
