import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEllipsisV,
  faMicrophone,
  faPaperPlane,
  faSmile,
} from '@fortawesome/free-solid-svg-icons';

import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent {
  faEllipsisV = faEllipsisV;
  faSmile = faSmile;
  faMicrophone = faMicrophone;
  faPaperPlane = faPaperPlane;

  private messageService = inject(MessageService);
  selectedUser = this.messageService.getSelectedUser;
}
