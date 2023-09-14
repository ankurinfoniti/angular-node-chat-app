import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnChanges {
  faArrowLeft = faArrowLeft;

  @Input('showContact') showContact = false;
  @ViewChild('sideTwo') sideTwo!: ElementRef;

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
