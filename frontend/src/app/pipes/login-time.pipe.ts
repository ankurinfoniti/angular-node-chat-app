import { Pipe, PipeTransform } from '@angular/core';
import { format, isThisWeek, isToday, isYesterday, parseISO } from 'date-fns';

@Pipe({
  name: 'loginTime',
  standalone: true,
})
export class LoginTimePipe implements PipeTransform {
  transform(value: string): string {
    let date = parseISO(value);

    if (isToday(date)) {
      return format(date, 'p');
    }

    if (isYesterday(date)) {
      return 'Yesterday';
    }

    if (isThisWeek(date)) {
      return format(date, 'EEEE');
    }

    return format(date, 'MM/dd/yyyy');
  }
}
