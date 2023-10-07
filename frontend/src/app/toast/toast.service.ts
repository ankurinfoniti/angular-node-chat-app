import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Toast } from './toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toast = new Subject<Toast>();

  success(message: string) {
    let data: Toast = { message, type: 'success' };

    this.toast.next(data);
  }

  error(message: string) {
    let data: Toast = { message, type: 'error' };

    this.toast.next(data);
  }

  warning(message: string) {
    let data: Toast = { message, type: 'warning' };

    this.toast.next(data);
  }

  info(message: string) {
    let data: Toast = { message, type: 'info' };

    this.toast.next(data);
  }
}
