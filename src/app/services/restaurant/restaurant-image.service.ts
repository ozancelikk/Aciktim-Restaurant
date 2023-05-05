import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listReponseModel';
import { Responsemodel } from 'src/app/models/responseModel';
import { RestaurantImage } from 'src/app/models/restaurant/restaurantImage';
import { RestaurantImageDto } from 'src/app/models/restaurantImage/restaurantImageDto';
import { UpdateRestaurantImageDto } from 'src/app/models/restaurantImage/updateRestaurantImageDto';
import { SingleResponseModel } from 'src/app/models/singleresponseModel';

@Injectable({
  providedIn: 'root'
})
export class RestaurantImageService {
  apiUrl="https://localhost:44361/api/RestaurantImage"
  constructor(private httpClient:HttpClient) { }

  addImage(image:RestaurantImage):Observable<Responsemodel>{
    const formData = new FormData();
    formData.append("image",image.image)
    formData.append("restaurantId",image.restaurantId)
    return this.httpClient.post<Responsemodel>(this.apiUrl+"/Add",formData)
  }
  updateImage(image:UpdateRestaurantImageDto):Observable<Responsemodel>{
    const formData = new FormData();
    formData.append("image",image.image)
    formData.append("restaurantId",image.restaurantId)
    formData.append("id",image.id)
    return this.httpClient.post<Responsemodel>(this.apiUrl+"/Update",formData)
  }
  getImagesByRestaurantId(id:string):Observable<ListResponseModel<RestaurantImageDto>>{
    return this.httpClient.get<ListResponseModel<RestaurantImageDto>>(this.apiUrl+"/GetImagesByRestaurantId?restaurantId="+id)
  }
}
