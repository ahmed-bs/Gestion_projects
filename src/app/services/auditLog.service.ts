import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, audit } from 'rxjs';
import { AuditLog } from '../models/audit_log';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuditLogService {


  private baseUrl = environment.Api +'auditlogs'; 
  auditLog!:AuditLog;
  constructor(private http: HttpClient) { }
  private user: string | null = localStorage.getItem('userName');
  createAuditLog(msg: string): Observable<AuditLog> {
    if (!this.user) {
      // Handle user not found in localStorage
      return new Observable<AuditLog>();
    }

    const message = `${this.user} did ${msg} in ${(new Date().toString())}`;
    const headers = this.createHeaders();

    return this.http.post<AuditLog>(`${this.baseUrl}/saveauditLogs`, this.auditLog, { headers });
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
