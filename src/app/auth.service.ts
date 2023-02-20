import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
function _window() : any {
  // return the global native browser window object
  return window;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get nativeWindow() : any {
    return _window();
 }
constructor(private httpService:HttpClient) { }
}
