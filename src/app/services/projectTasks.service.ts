import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectTask } from '../models/project_tasks';

@Injectable({
  providedIn: 'root'
})
export class ProjectTasksService {

  private baseUrl = environment.Api + 'project-tasks';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    // Add other headers if required
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  createProjectTask(projectTask: ProjectTask): Observable<ProjectTask> {
    return this.http.post<ProjectTask>(`${this.baseUrl}/save`, projectTask, { headers: this.getHeaders() });
  }

  getAllProjectTasks(): Observable<ProjectTask[]> {
    return this.http.get<ProjectTask[]>(`${this.baseUrl}/all`, { headers: this.getHeaders() });
  }

  getOneProjectTaskById(id: number): Observable<ProjectTask> {
    return this.http.get<ProjectTask>(`${this.baseUrl}/getone/${id}`, { headers: this.getHeaders() });
  }

  updateProjectTask(projectTask: ProjectTask): Observable<ProjectTask> {
    return this.http.put<ProjectTask>(`${this.baseUrl}/update/${projectTask.id}`, projectTask, { headers: this.getHeaders() });
  }

  deleteProjectTask(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { headers: this.getHeaders(), responseType: 'text' });
  }

  getTasksByProjectId(projectId: number): Observable<ProjectTask[]> {
    const url = `${this.baseUrl}/by-project/${projectId}`;
    return this.http.get<ProjectTask[]>(url, { headers: this.getHeaders() });
  }
}
