import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listReponseModel';
import { Order } from 'src/app/models/order/order';
import { OrderDictionary } from 'src/app/models/order/orderDictionary';
import { Responsemodel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiUrl:string= "https://localhost:44361/api/Order"
  constructor(private httpClient:HttpClient) { }

  getActiveOrderDetailsByRestaurantId(restaurantId:string):Observable<ListResponseModel<Order>>{
    return this.httpClient.get<ListResponseModel<Order>>(this.apiUrl+"/GetActiveOrdersByRestaurantId?restaurantId=" + restaurantId)
  }
  getPassiveOrderDetailsByRestaurantId(restaurantId:string):Observable<ListResponseModel<Order>> {
    return this.httpClient.get<ListResponseModel<Order>>(this.apiUrl + "/GetPassiveOrdersByRestaurantId?restaurantId=" + restaurantId);
  }
  changeOrderStatusToCourier(order:Order):Observable<Responsemodel>{
    return this.httpClient.post<Responsemodel>(this.apiUrl+"/ChangeOrderStatusToCourier",order);
  }
  chanceOrderStatusToReady(order:Order):Observable<Responsemodel>{
    return this.httpClient.post<Responsemodel>(this.apiUrl+"/ChangeOrderStatusToReady",order);
  }
  chanceOrderStatusToComplete(order:Order):Observable<Responsemodel>{
    return this.httpClient.post<Responsemodel>(this.apiUrl+"/ChangeOrderStatusToComplete",order);
  }
  getOrdersByRestaurantId(restaurantId:string):Observable<ListResponseModel<OrderDictionary>>{
    return this.httpClient.get<ListResponseModel<OrderDictionary>>(this.apiUrl+"/OrderMenusByRestaurantId?restaurantId="+restaurantId)
  }

  
}
