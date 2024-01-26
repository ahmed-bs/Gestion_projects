// team.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models/team';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private baseUrl = environment.Api +"teams";

  constructor(private http: HttpClient) {}

  createTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(`${this.baseUrl}/save`, team);
  }

  getAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}/all`);
  }

  getOneTeamById(id: number): Observable<Team> {
    return this.http.get<Team>(`${this.baseUrl}/getone/${id}`);
  }

  updateTeam(id: number, team: Team): Observable<Team> {
    return this.http.put<Team>(`${this.baseUrl}/update/${id}`, team);
  }

  deleteTeam(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`);
  }
}
