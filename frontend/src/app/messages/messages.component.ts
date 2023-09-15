import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEllipsisV,
  faMicrophone,
  faPaperPlane,
  faSmile,
} from '@fortawesome/free-solid-svg-icons';

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
}
