import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noValue',
})
export class NoValuePipe implements PipeTransform {
  transform(value: string, ...args: any[]): string {
    if (!value || value === 'null') {
      return 'Not set';
    }
    return value;
  }
}
