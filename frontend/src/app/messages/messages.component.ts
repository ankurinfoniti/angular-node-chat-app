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
import { ToastService } from '../toast/toast.service';
import { Message } from '../models/message.model';
import { AuthService } from '../auth/auth.service';
import { TokenUser } from '../models/user.model';
import { LoginTimePipe } from '../pipes/login-time.pipe';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, LoginTimePipe],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent {
  faEllipsisV = faEllipsisV;
  faSmile = faSmile;
  faMicrophone = faMicrophone;
  faPaperPlane = faPaperPlane;
  message = '';
  messageList: Message[] = [];
  messageEnd = true;

  private destroyRef = inject(DestroyRef);
  private messageService = inject(MessageService);
  private authService = inject(AuthService);
  private toast = inject(ToastService);
  loggedInUser!: TokenUser;

  selectedUser = this.messageService.getSelectedUser;
  selectedUser$ = toObservable(this.selectedUser);

  @ViewChild('conversation') private conversationContainer!: ElementRef;

  ngOnInit() {
    const token = this.authService.getToken();

    if (token) {
      this.loggedInUser = this.authService.decodeToken(token);
    }

    this.selectedUser$.subscribe((result) => {
      console.log(result);
      if (result.id) {
        this.messageList = [];
        this.getMessages();
      }
    });
  }

  saveMessage() {
    this.message = this.message.trim();

    if (this.message) {
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
              this.toast.error(error.error.message);
            }
          },
        });
    }
  }

  getMessages(isPrev = false) {
    this.messageService.getMessages().subscribe({
      next: (result: Message[]) => {
        this.messageEnd = true;
        if (result.length) {
          this.messageEnd = false;

          if (!isPrev) {
            this.messageList.push(...result.reverse());
            setTimeout(() => {
              this.scrollToBottom();
            }, 0);
          } else {
            this.messageList.unshift(...result.reverse());
          }
        }
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 400) {
          console.log(error);
          this.toast.error(error.error.message);
        }
      },
    });
  }

  showPreviousMessage() {
    this.getMessages(true);
  }

  scrollToBottom(): void {
    this.conversationContainer.nativeElement.scrollTop =
      this.conversationContainer.nativeElement.scrollHeight;
  }
}
