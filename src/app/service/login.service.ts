import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private https: HttpClient) { }

  ApiUrl = 'http://localhost:3000/auth/login';

  loginUser(userData: any): Observable<any> {
    return this.https.post(`${this.ApiUrl}`, userData);
  }

}
