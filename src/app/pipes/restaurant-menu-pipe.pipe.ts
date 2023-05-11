import { Pipe, PipeTransform } from '@angular/core';
import { Menu } from '../models/menu/menu';
import { RestaurantMenu } from '../models/restaurant/restaurantMenu';

@Pipe({
  name: 'restaurantMenuPipe'
})
export class RestaurantMenuPipePipe implements PipeTransform {

  transform(value: RestaurantMenu[], filter:string): RestaurantMenu[] {
    return filter ? value.filter(x=>x.menuTitle.toLowerCase().indexOf(filter.toLowerCase())!==-1) : value

  }

}
