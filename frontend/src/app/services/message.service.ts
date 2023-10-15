import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { io } from 'socket.io-client';

import { LoggedInUser, TokenUser } from '../models/user.model';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private http = inject(HttpClient);
  private page = signal<number>(0);
  private selectedUser = signal<TokenUser>({ id: '', name: '', email: '' });
  getSelectedUser = computed(() => this.selectedUser());

  getSocketIo(email: string) {
    return io('http://localhost:3000', {
      auth: { email },
    });
  }

  setSelectedUser(user: LoggedInUser) {
    const selectedUser = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    if (this.selectedUser().id !== selectedUser.id) {
      localStorage.setItem('selectedUser', JSON.stringify(selectedUser));
      this.selectedUser.set(selectedUser);
      this.resetPage();
    }
  }

  getUser(): TokenUser {
    return { id: '', name: '', email: '' };
  }

  setPage(count: number) {
    this.page.update((page) => page + count);
  }

  resetPage() {
    this.page.set(0);
  }

  saveMessage(message: string) {
    const data = {
      message: message,
      receiverId: this.selectedUser().id,
    };

    return this.http.post('http://localhost:3000/api/v1/messages/save', data);
  }

  getMessageUsers() {
    return this.http.get<LoggedInUser[]>(
      'http://localhost:3000/api/v1/messages/users'
    );
  }

  getMessages() {
    this.setPage(1);

    const data = {
      receiverId: this.selectedUser().id,
      page: this.page(),
    };

    return this.http.post<Message[]>(
      'http://localhost:3000/api/v1/messages',
      data
    );
  }
}
