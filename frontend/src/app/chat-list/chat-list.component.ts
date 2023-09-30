import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faComment, faSignOut } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css'],
})
export class ChatListComponent {
  faSignOut = faSignOut;
  faComment = faComment;
  authService = inject(AuthService);
  router = inject(Router);

  @Output() showContact = new EventEmitter<boolean>();

  showContactList() {
    this.showContact.emit(true);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
