import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-message.component.html',
  styleUrls: ['./form-message.component.css'],
})
export class FormMessageComponent {
  @Input() message: string = '';
  @Input() messageType: string = '';
}
