import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Register } from 'src/app/models/auth/register';
import { Observable } from 'rxjs';
import { SingleResponseModel } from 'src/app/models/singleresponseModel';

import { Login } from 'src/app/models/auth/login';
import { Token } from 'src/app/models/auth/token';
import { ChangePassword } from 'src/app/models/restaurant/changePassword';
import { Responsemodel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL:string="https://localhost:44361/api/Auth"

  constructor(private httpClient:HttpClient) { }

  register(register:Register):Observable<SingleResponseModel<Token>> {
    return this.httpClient.post<SingleResponseModel<Token>>(this.apiURL +"/Register",register);
  }
  login(login:Login):Observable<SingleResponseModel<Token>> {
    return this.httpClient.post<SingleResponseModel<Token>>(this.apiURL + "/Login",login);
  }
  logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("customerId")
    localStorage.removeItem("expiration")
  }
  changePassword(changePassword:ChangePassword):Observable<Responsemodel>{
    return this.httpClient.post<Responsemodel>(this.apiURL+"/ChangePassword",changePassword);
  }
}
