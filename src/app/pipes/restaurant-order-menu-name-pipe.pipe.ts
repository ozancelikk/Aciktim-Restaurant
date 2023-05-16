import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../models/order/order';

@Pipe({
  name: 'restaurantOrderMenuNamePipe'
})
export class RestaurantOrderMenuNamePipePipe implements PipeTransform {

  transform(value: Order[], filter: string): Order[] {
    let myArray: Order[] = [];
    if (filter) {
      filter = filter.toLowerCase();
      for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < value[i].menus.length; j++) {
          if (value[i].menus[j].menuName.toLowerCase().indexOf(filter) !== -1) {
            myArray.push(value[i]);
            break;
          }
        }
      }
      return myArray;
    }
    else {
      return value;
    }
  }
}
