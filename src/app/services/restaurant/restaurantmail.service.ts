import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Responsemodel } from 'src/app/models/responseModel';
import { RestaurantMail } from 'src/app/models/restaurant/restaurantMail';

@Injectable({
  providedIn: 'root'
})
export class RestaurantmailService {

  apiUrl= "https://localhost:44361/api/RestaurantSupport"
  constructor(private httpClient:HttpClient) { }
  addMail(model:RestaurantMail):Observable<Responsemodel>{
    return this.httpClient.post<Responsemodel>(this.apiUrl + "/Add", model);
  }
}
