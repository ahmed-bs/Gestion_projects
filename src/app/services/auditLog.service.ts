import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, audit, catchError, throwError } from 'rxjs';
import { AuditLog } from '../models/audit_log';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuditLogService {


  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong, please try again later.');
  }

  private baseUrl = environment.Api +'auditlogs'; 
  auditLog:AuditLog = new AuditLog() ;
  message!:string ;
  constructor(private http: HttpClient) { }
   user!: string;
  createAuditLog(msg: string): Observable<AuditLog> {
    this.user = localStorage.getItem('userName')!; 

    this.message = `${this.user} did ${msg} in ${(new Date().toString())}`;
    const headers = this.createHeaders();

    this.auditLog.action =this.message || 'Amine did delete project ${(new Date().toString())}';
    console.log("fjkdqssdffjfjfjfjfjfjfj",this.auditLog.action );
    
    return this.http.post<AuditLog>(`${this.baseUrl}/saveauditLogs`, this.auditLog, { headers }).pipe(
      (catchError(this.handleError))
    );
  }

  getAllAuditLogs(): Observable<AuditLog[]> {
    const headers = this.createHeaders();
    return this.http.get<AuditLog[]>(`${this.baseUrl}/allauditLogs`, { headers });
  }

  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  }

}
