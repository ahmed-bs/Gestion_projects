import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuditLogService } from './auditLog.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl =environment.Api;

  constructor(private http: HttpClient,private serviceAuditLog:AuditLogService) { }

  get isLoggedIn(): boolean {
    // Check if the token is present and not expired
    const token = localStorage.getItem('token');
    return !!token;
  }

  login(username: string, password: string): Observable<any> {
    console.log("username",username);
    
    const loginRequest = { username, password };
    console.log("s22s",loginRequest);
    console.log( `${this.apiUrl}api/auth/signin`);


    return this.http.post<any>(`${this.apiUrl}api/auth/signin`, loginRequest)
      .pipe(
        tap(response => {
          // Assuming the backend returns a token
          const token = response.accessToken;
          localStorage.setItem('token', token);
          localStorage.setItem('userName', username);
        })
      );
  }

  logout(): Observable<any> {

      const token = localStorage.getItem('token');
          // Clear local storage
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
      // Add appropriate headers or other data needed for the logout request
      const headers = {
        Authorization: `Bearer ${token}`
        // Add other headers if required
      };
  
      // Send a POST request to the logout endpoint
      return this.http.post<any>(`${this.apiUrl}api/auth/signout`, {}, { headers })      .pipe(
        tap(() => {

        })
      );
    }





      
  }

