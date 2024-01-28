import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Project } from '../models/project';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = environment.Api +"projects"; 
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong, please try again later.');
  }
  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<Project[]> {
    console.log(`${this.baseUrl}/all`);
    console.log(this.http.get<Project[]>(`${this.baseUrl}/all`));
    return this.http.get<Project[]>(`${this.baseUrl}/all`)
    .pipe(catchError(this.handleError));;
  }




  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/${id}`);
  }

  createProject(project: Project): Observable<any> {
    return this.http.post(`${this.baseUrl}/save`, project);
  }

  updateProject(id: number, project: Project): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, project);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}