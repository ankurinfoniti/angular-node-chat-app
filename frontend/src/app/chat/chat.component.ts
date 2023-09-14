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
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  faEllipsisV = faEllipsisV;
  faSmile = faSmile;
  faMicrophone = faMicrophone;
  faPaperPlane = faPaperPlane;
}
