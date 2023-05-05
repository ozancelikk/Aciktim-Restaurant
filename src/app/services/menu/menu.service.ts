import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from 'src/app/models/menu/menu';
import { Responsemodel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleresponseModel';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  apiUrl="https://localhost:44361/api/Menu"
  
  constructor( private httpClient:HttpClient) { }

  add(menu:Menu):Observable<SingleResponseModel<string>>{
    return this.httpClient.post<SingleResponseModel<string>>(this.apiUrl+"/AddMenuWithImage",menu)
  }
}
