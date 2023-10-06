import {
  Component,
  DestroyRef,
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  contactList!: User[];
  contactListDuplicate!: User[];

  private destroyRef = inject(DestroyRef);
  private userService = inject(UserService);

  @Input('showContact') showContact = false;
  @ViewChild('sideTwo') sideTwo!: ElementRef;

  ngOnInit(): void {
    this.userService
      .getAllUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        this.contactList = result;
        this.contactListDuplicate = this.contactList;
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['showContact']['currentValue']) {
      this.showContactList();
    }
  }

  searchContact(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim();

    this.contactList = [...this.contactListDuplicate];

    if (value) {
      this.contactList = this.contactList.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );
    }
  }

  showContactList() {
    this.sideTwo.nativeElement.style.left = 0;
  }

  hideContactList() {
    this.sideTwo.nativeElement.style.left = '-100%';
  }
}
