import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }
  ApiBlog = `http://localhost:3000/blog`;

  // get method
  getBlog(): Observable<Iblog[]> {
    let headers = new HttpHeaders().set("token", `${this.IsLoggedIn()}`);
    return this.http.get<Iblog[]>(this.ApiBlog, { headers });
  };

  // post method
  postBlog(todo: Iblog): Observable<Iblog[]> {
    let headers = new HttpHeaders().set("token", `${this.IsLoggedIn()}`);
    // console.log(headers)
    return this.http.post<Iblog[]>(this.ApiBlog, todo, { headers });
  };

  // update method
  updateData(id: Iblog, data: Iblog): Observable<Iblog> {
    let headers = new HttpHeaders().set("token", `${this.IsLoggedIn()}`);
    return this.http.put<Iblog>(this.ApiBlog + '/' + id, data, { headers });
  }

  // delete method
  deleteData(deletebyID: Iblog): Observable<Iblog> {
    let headers = new HttpHeaders().set("token", `${this.IsLoggedIn()}`);
    // console.log(id)
    return this.http.delete<Iblog>(this.ApiBlog + '/' + deletebyID, { headers });
  }

  // token
  IsLoggedIn() {
    return localStorage.getItem('token');
  }

  // logout
  logout() {
    localStorage.removeItem('token')
  }


  // private dataSubject = new Subject<any>();

  // sendData(data: any) {
  //   this.dataSubject.next(data);
  // }

  // getData() {
  //   return this.dataSubject.asObservable();
  // }

};

export interface Iblog {
  id: number,
  title: string,
  description: string
}