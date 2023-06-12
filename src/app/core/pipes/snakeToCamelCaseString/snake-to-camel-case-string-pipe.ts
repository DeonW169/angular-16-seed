import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'snakeToCamelCaseString',
})
export class SnakeToCamelCaseStringPipe implements PipeTransform {
  public transform(value: any, args?: any): any {
    return this.snakeToCamelString(value);
  }

  snakeToCamelString(value: any) {
    const snakeToCamel = (str: string) =>
      str.replace(/([_][a-z])/g, (group: string) =>
        group.toUpperCase().replace('_', ' ')
      );

    let val = snakeToCamel(value);
    let str = val.charAt(0).toUpperCase() + val.slice(1);

    return str;
  }
}
