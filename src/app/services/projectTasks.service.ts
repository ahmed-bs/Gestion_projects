import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectTask } from '../models/project_tasks';
@Injectable({
  providedIn: 'root'
})
export class ProjectTasksService {

  private baseUrl = environment.Api +'project-tasks'; 

  constructor(private http: HttpClient) { }

  createProjectTask(projectTask: ProjectTask): Observable<ProjectTask> {
    return this.http.post<ProjectTask>(`${this.baseUrl}/save`, projectTask);
  }

  getAllProjectTasks(): Observable<ProjectTask[]> {
    return this.http.get<ProjectTask[]>(`${this.baseUrl}/all`);
  }

  getOneProjectTaskById(id: number): Observable<ProjectTask> {
    return this.http.get<ProjectTask>(`${this.baseUrl}/getone/${id}`);
  }

  updateProjectTask(projectTask: ProjectTask): Observable<ProjectTask> {
    return this.http.put<ProjectTask>(`${this.baseUrl}/update/${projectTask.id}`, projectTask);
  }

  deleteProjectTask(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }

  getTasksByProjectId(projectId: number): Observable<ProjectTask[]> {
    const url = `${this.baseUrl}/by-project/${projectId}`;
    return this.http.get<ProjectTask[]>(url);
  }
  
}
