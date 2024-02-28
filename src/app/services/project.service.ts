import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Project } from '../models/project';
import { environment } from 'src/environments/environment';
import { AuditLogService } from './auditLog.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = environment.Api + "projects";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  };

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong, please try again later.');
  }

  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/all`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/getById/${id}`, this.httpOptions);
  }

  createProject(project: Project): Observable<any> {
 
    return this.http.post(`${this.baseUrl}/save`, project, this.httpOptions);
  }

  updateProject(project: Project): Observable<any> {

    return this.http.put(`${this.baseUrl}/update/${project.id}`, project, this.httpOptions);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, this.httpOptions);
  }
}
