import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  data: any[] = [];
  transform(items: any, filter: any): any {
    if (!filter) {
      return items;
    }
    if (!Array.isArray(items)) {
      return items;
    }
    this.data = [];
      if (filter && Array.isArray(items)) {
        items.forEach(element => {
          if (this.data.length === 5) {
            return this.data.length === 5;
          }
          for (const key in element) {
            if (element[key] !== null && element[key] !== undefined && element[key].toString().toLowerCase().includes(filter.toLowerCase())) {
              this.data.push(element);
              break;
            }
          }
        });
      }
    return this.data;
  }

}
