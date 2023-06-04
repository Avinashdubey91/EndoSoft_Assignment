import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  baseUrl = "https://localhost:44338/api/User/";

  userRegistration(user : Array<string>){
    return this.http.post(this.baseUrl + "CreateUser", 
    {
      FirstName : user[0],
      LastName : user[1],
      Address : user[2],
      Mobile : user[3],
      DOB : user[4],
      Password : user[5]
    }, 
    {
      responseType : 'text'
    });
  }

  loginUser(loginInfo : Array<String>){
    return this.http.post(this.baseUrl + "LoginUser", {
      MobileNo : loginInfo[0],
      Password : loginInfo[1]
    },
    {
      responseType : 'text'
    });
  }

  getUserList(): Observable<any[]>{
    return this.http.get<any>(this.baseUrl + 'UserList');
  }

}
