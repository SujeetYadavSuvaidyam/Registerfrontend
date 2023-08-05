import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }
  ApiUrl = 'http://localhost:3000/auth/register'
 
  // registerUser() {
  //   return this.http.get(this.ApiUrl);
  // }

  // Proceedregister(inputdata: any) {
  //   return this.http.post(this.ApiUrl, inputdata)
  // }

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.ApiUrl}`, userData);
  }

}
