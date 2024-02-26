import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models/team';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private baseUrl = environment.Api + 'teams';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      // Add other headers if required
    });
  }

  createTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(`${this.baseUrl}/save`, team, { headers: this.getHeaders() });
  }

  getAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}/all`, { headers: this.getHeaders() });
  }

  getOneTeamById(id: number): Observable<Team> {
    return this.http.get<Team>(`${this.baseUrl}/getone/${id}`, { headers: this.getHeaders() });
  }

  updateTeam(id: number, team: Team): Observable<Team> {
    return this.http.put<Team>(`${this.baseUrl}/update/${id}`, team, { headers: this.getHeaders() });
  }

  deleteTeam(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`, { headers: this.getHeaders() });
  }
}
