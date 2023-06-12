import { Pipe, PipeTransform } from '@angular/core';
import { snakeToCamelCase } from '../../utility-functions/utility-functions';

@Pipe({
  name: 'snakeToCamelCase',
})
export class SnakeToCamelCasePipe implements PipeTransform {
  public transform(value: any, args?: any): any {
    return this.toCamel(value);
  }

  toCamel(o: any) {
    return snakeToCamelCase(o);
  }
}
