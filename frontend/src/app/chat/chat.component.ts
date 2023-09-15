import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserListComponent } from '../user-list/user-list.component';
import { MessagesComponent } from '../messages/messages.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, MessagesComponent, UserListComponent],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {}
