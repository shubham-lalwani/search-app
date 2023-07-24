import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  keys = ['firstName', 'status', 'name'];
  transform(items: any[], text: string): any {
    //setting default key
    let currentKey = this.keys[0];

    //identify the key in the list
    for (let key of this.keys) {
      if (items && items.length && items[0][key]) {
        currentKey = key;
        break;
      }
    }

    return text && items.length
      ? items.filter(item => item[currentKey]?.toLowerCase().indexOf(text) !== -1)
      : items;
  }
}
