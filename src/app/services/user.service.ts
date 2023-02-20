import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient:HttpClient) { }
  createUser(data:any)
  {
    let headers={"Content-Type":"application/json","Access-Control-Allow-Origin":'*'};
    return this.httpClient.post("http://127.0.0.1:8000/api/users/",data,{headers});
  }
  loginUser(data:any)
  {
    let headers={"Content-Type":"application/json","Access-Control-Allow-Origin":'*'};
    return this.httpClient.post("http://127.0.0.1:8000/api/users/login",data,{headers});
  }
}
