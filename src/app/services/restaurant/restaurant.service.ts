import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listReponseModel';
import { RestaurantComment } from 'src/app/models/restaurant/restaurantComment';
import { RestaurantDto } from 'src/app/models/restaurant/restaurantDto';
import { RestaurantMenu } from 'src/app/models/restaurant/restaurantMenu';
import { SingleResponseModel } from 'src/app/models/singleresponseModel';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  apiURL:string = "https://localhost:44361/api/Restaurant";
  apiURL2:string = "https://localhost:44361/api/Menu";
  apiURL3:string = "https://localhost:44361/api/RestaurantComment";

  constructor(private httpClient:HttpClient) { }

  getRestaurantMenusByRestaurantId(restaurantId:string):Observable<ListResponseModel<RestaurantMenu>>{
    return this.httpClient.get<ListResponseModel<RestaurantMenu>>(this.apiURL2+"/GetMenuDetailsByRestaurantId?restaurantId="+restaurantId);
  }
  getRestaurantCommentsByRestaurantId(restaurantId:string):Observable<ListResponseModel<RestaurantComment>>{
    return this.httpClient.get<ListResponseModel<RestaurantComment>>(this.apiURL3+"/GetCommentsByRestaurantId?restaurantId="+restaurantId);
  }
  getRestaurantDetails(restaurantId:string):Observable<SingleResponseModel<RestaurantDto>>{
    return this.httpClient.get<SingleResponseModel<RestaurantDto>>(this.apiURL+"/getdetailsdtobyid?id="+restaurantId);
  }
  
}
