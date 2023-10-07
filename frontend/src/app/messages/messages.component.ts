import {
  Component,
  DestroyRef,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
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
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent {
  faEllipsisV = faEllipsisV;
  faSmile = faSmile;
  faMicrophone = faMicrophone;
  faPaperPlane = faPaperPlane;
  message = '';

  private destroyRef = inject(DestroyRef);
  private messageService = inject(MessageService);

  selectedUser = this.messageService.getSelectedUser;
  selectedUser$ = toObservable(this.selectedUser);

  @ViewChild('conversation') private conversationContainer!: ElementRef;

  ngOnInit() {
    this.selectedUser$.subscribe((result) => {
      if (result.id) {
        setTimeout(() => this.scrollToBottom(), 0);
      }
    });
  }

  saveMessage() {
    this.message = this.message.trim();

    if (this.message) {
      //this.message = '';
      this.messageService
        .saveMessage(this.message)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          tap(() => (this.message = ''))
        )
        .subscribe({
          next: (result) => {
            console.log(result);
          },
          error: (error: HttpErrorResponse) => {
            if (error.status === 400) {
              console.log(error);
              //this.toastr.error(error.error.message, 'Error');
            }
          },
        });
    }
  }

  getMessages() {
    //this.messageService.getMessages().subscribe(console.log);
  }

  scrollToBottom(): void {
    this.conversationContainer.nativeElement.scrollTop =
      this.conversationContainer.nativeElement.scrollHeight;
  }
}
