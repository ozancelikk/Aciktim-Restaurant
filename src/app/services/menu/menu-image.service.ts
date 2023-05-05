import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuImage } from 'src/app/models/menu/menuImage';
import { Responsemodel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class MenuImageService {
  apiUrl="https://localhost:44361/api/MenuImage"
  constructor(private httpClient:HttpClient) { }

  addImage(image:MenuImage):Observable<Responsemodel>{
    const formData = new FormData();
    formData.append("image",image.image)
    formData.append("menuId",image.menuId)
    return this.httpClient.post<Responsemodel>(this.apiUrl+"/Add",formData)
  }
}
