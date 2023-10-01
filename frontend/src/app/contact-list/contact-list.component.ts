import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnChanges, OnInit {
  faArrowLeft = faArrowLeft;
  contactList$!: Observable<User[]>;

  private userService = inject(UserService);

  @Input('showContact') showContact = false;
  @ViewChild('sideTwo') sideTwo!: ElementRef;

  ngOnInit(): void {
    this.contactList$ = this.userService.getAllUsers();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['showContact']['currentValue']) {
      this.showContactList();
    }
  }

  showContactList() {
    this.sideTwo.nativeElement.style.left = 0;
  }

  hideContactList() {
    this.sideTwo.nativeElement.style.left = '-100%';
  }
}
