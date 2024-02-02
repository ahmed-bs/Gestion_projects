import { Component, OnInit } from '@angular/core';
import { Team } from '../models/team';
import { TeamService } from '../services/team.service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  listUser: User[] = [];
  teamList: Team[] = [];
  newTeam: Team = new Team();
  constructor( private teamService: TeamService,private userService: UserService) { }

  ngOnInit() {
    this.getAllTeams();
    this.getAllUser();
  }


  getAllTeams() {
    this.teamService.getAllTeams().subscribe(
      data => {this.teamList = data;
      console.log("this is teams list :",data);
      },
      error => {
        console.error(error);
      }
    )
  }
  getAllUser() {
    this.userService.getAllUsers().subscribe(
      data => { this.listUser = data; },
      error => {
        console.error(error);
      }
    )
  }

  addTeam(){

  }


}
