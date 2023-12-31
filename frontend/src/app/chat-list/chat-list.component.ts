import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faComment, faSignOut } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../auth/auth.service';
import { MessageService } from '../services/message.service';
import { LoggedInUser } from '../models/user.model';
import { LoginTimePipe } from '../pipes/login-time.pipe';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, LoginTimePipe],
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css'],
})
export class ChatListComponent implements OnInit {
  faSignOut = faSignOut;
  faComment = faComment;
  userLists!: LoggedInUser[];
  userListsDuplicate!: LoggedInUser[];
  messageService = inject(MessageService);
  authService = inject(AuthService);
  router = inject(Router);

  @Output() showContact = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.messageService.getMessageUsers().subscribe((result) => {
      this.userLists = result;
      this.userListsDuplicate = result;
    });
  }

  searchContact(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim();

    this.userLists = [...this.userListsDuplicate];

    if (value) {
      this.userLists = this.userLists.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );
    }
  }

  selectUser(user: LoggedInUser) {
    this.messageService.setSelectedUser(user);
  }

  showContactList() {
    this.showContact.emit(true);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
