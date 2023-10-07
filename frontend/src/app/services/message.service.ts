import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { LoggedInUser, TokenUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private page = signal<number>(1);
  private selectedUser = signal<TokenUser>(this.getUser());
  getSelectedUser = computed(() => this.selectedUser());

  private http = inject(HttpClient);

  setSelectedUser(user: LoggedInUser) {
    const selectedUser = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    localStorage.setItem('selectedUser', JSON.stringify(selectedUser));
    this.selectedUser.set(selectedUser);
    this.page.set(1);
  }

  getUser(): TokenUser {
    return { id: '', name: '', email: '' };
  }

  setPage(count: number) {
    this.page.update((page) => page + count);
  }

  saveMessage(message: string) {
    const data = {
      message: message,
      receiverId: this.selectedUser().id,
    };

    return this.http.post('/api/v1/messages/save', data);
  }

  getMessageUsers() {
    return this.http.get<LoggedInUser[]>('/api/v1/messages/users');
  }

  getMessages() {
    //return this.http.post('/api/v1/messages');
  }
}
