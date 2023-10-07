import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircleCheck,
  faCircleXmark,
  faCircleExclamation,
  faCircleInfo,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

import { Toast } from './toast.model';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnInit {
  faCircleCheck = faCircleCheck;
  faCircleXmark = faCircleXmark;
  faCircleExclamation = faCircleExclamation;
  faCircleInfo = faCircleInfo;
  faXmark = faXmark;
  timer = 5000;
  toastList: Toast[] = [];

  private toastService = inject(ToastService);

  ngOnInit(): void {
    this.toastService.toast.subscribe((result: Toast) => {
      this.createToast(result);
    });
  }

  setIcon(type: string) {
    if (type === 'success') {
      return this.faCircleCheck;
    }

    if (type === 'error') {
      return this.faCircleXmark;
    }

    if (type === 'warning') {
      return this.faCircleExclamation;
    }

    if (type === 'info') {
      return this.faCircleInfo;
    }

    return this.faCircleCheck;
  }

  createToast(toast: Toast) {
    toast.id = this.toastList.length + 1;
    this.toastList.push(toast);
    setTimeout(() => this.removeToast(toast.id), this.timer);
  }

  removeToast(toastId: number | undefined) {
    if (toastId) {
      const index = this.toastList.findIndex((toast) => toast.id === toastId);
      this.toastList.splice(index, 1);
    }
  }
}
