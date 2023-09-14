import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faComment, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css'],
})
export class ChatListComponent {
  faEllipsisV = faEllipsisV;
  faComment = faComment;

  @Output() showContact = new EventEmitter<boolean>();

  showContactList() {
    this.showContact.emit(true);
  }
}
