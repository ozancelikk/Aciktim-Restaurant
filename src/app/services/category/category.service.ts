import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category/category';
import { ListResponseModel } from 'src/app/models/listReponseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl="https://localhost:44361/api/Category"
  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<Category>>{
    return this.httpClient.get<ListResponseModel<Category>>(this.apiUrl+"/GetAll")
  }
}
