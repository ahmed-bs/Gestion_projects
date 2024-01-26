import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = environment.Api +"projects"; 

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}`);
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/${id}`);
  }

  createProject(project: Project): Observable<any> {
    return this.http.post(`${this.baseUrl}`, project);
  }

  updateProject(id: number, project: Project): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, project);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
