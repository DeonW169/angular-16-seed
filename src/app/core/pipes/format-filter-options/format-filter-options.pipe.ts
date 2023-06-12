import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatFilterOptions'
})
export class FormatFilterOptionsPipe implements PipeTransform {
  transform(filter: any): any {
    let name;

    const capatilise = filter.charAt(0).toUpperCase() + filter.substr(1);
    name = capatilise.split(/(?=[A-Z])/).join(' ');

    return name;
  }
}
