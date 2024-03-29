import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listReponseModel';
import { Order } from 'src/app/models/order/order';
import { OrderDictionary } from 'src/app/models/order/orderDictionary';
import { OrdersByDate } from 'src/app/models/order/ordersByDate';
import { Responsemodel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleresponseModel';

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
  getTodayOrdersByRestaurantId(restaurantId:string):Observable<SingleResponseModel<OrdersByDate>>{
    return this.httpClient.get<SingleResponseModel<OrdersByDate>>(this.apiUrl+ "/GetTodayOrdersByRestaurantId?restaurantId="+restaurantId);
  }
  getYesterdayOrdersByRestaurantId(restaurantId:string):Observable<SingleResponseModel<OrdersByDate>>{
    return this.httpClient.get<SingleResponseModel<OrdersByDate>>(this.apiUrl+ "/GetYesterdayOrdersByRestaurantId?restaurantId="+restaurantId);
  }


  getRestaurantActiveOrderDetailsByDate(start:string,end:string,restaurantId:string):Observable<ListResponseModel<Order>> {
    return this.httpClient.get<ListResponseModel<Order>>(this.apiUrl +"/GetRestaurantActiveOrderDetailsByDate?start=" +start + "&end=" + end +"&restaurantId=" + restaurantId)
  } 

  getRestaurantPassiveOrderDetailsByDate(start:string,end:string,restaurantId:string):Observable<ListResponseModel<Order>> {
    return this.httpClient.get<ListResponseModel<Order>>(this.apiUrl +"/GetRestaurantPassiveOrderDetailsByDate?start=" +start + "&end=" + end +"&restaurantId=" + restaurantId)
  } 
  
  
}
