import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatListComponent } from '../chat-list/chat-list.component';
import { ContactListComponent } from '../contact-list/contact-list.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, ChatListComponent, ContactListComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  showContact = false;

  notifyContact() {
    this.showContact = true;
    setTimeout(() => {
      this.showContact = false;
    }, 0);
  }
}
