import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../models/order/order';

@Pipe({
  name: 'orderCustomerId'
})
export class OrderCustomerIdPipe implements PipeTransform {

  transform(value: Order[],  filter:string): Order[] {
    return filter ? value.filter(x=>x.customerId.toLowerCase().indexOf(filter.toLowerCase())!== -1): value;
  }

}
