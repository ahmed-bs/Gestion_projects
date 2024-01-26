import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

  export class UserService {
    private baseUrl =  environment.Api +"users"; 
  
    constructor(private http: HttpClient) {}
  
    createUser(user: User): Observable<User> {
      return this.http.post<User>(`${this.baseUrl}/save`, user);
    }
  
    getAllUsers(): Observable<User[]> {
      return this.http.get<User[]>(`${this.baseUrl}/all`);
    }
  
    getOneUserById(id: number): Observable<User> {
      return this.http.get<User>(`${this.baseUrl}/getone/${id}`);
    }
  
    updateUser(id: number, user: User): Observable<User> {
      return this.http.put<User>(`${this.baseUrl}/update/${id}`, user);
    }
  
    deleteUser(id: number): Observable<any> {
      return this.http.delete<any>(`${this.baseUrl}/delete/${id}`);
    }

}
