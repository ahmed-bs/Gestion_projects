import { Component, OnInit } from '@angular/core';
import { Team } from '../models/team';
import { TeamService } from '../services/team.service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  listUser: User[] = [];
  teamList: Team[] = [];
  selectedItems: User[] = [];
  newTeam: Team = new Team();
 
  constructor( private teamService: TeamService,private userService: UserService) { 
  }

  ngOnInit() {
    // this.newTeam.users=[];
    this.getAllTeams();
    this.getAllUser();
  }
  updateList(item: User): void {
    if (item.selected) {
      this.selectedItems.push(item);
      // this.newTeam.users.push(item);
    } else {
      this.selectedItems = this.selectedItems.filter((selectedItem) => selectedItem !== item);
      // this.newTeam.users =  this.newTeam.users.filter((selectedItem) => selectedItem !== item);
    }

    console.log("urijsodc: ",this.newTeam);
  }

  getAllTeams() {
    this.teamService.getAllTeams().subscribe(
      data => {
        this.teamList = data;
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

    this.teamService.createTeam(this.newTeam).subscribe(
      data => {
        console.log('Team added successfully:', data);
        this.getAllTeams();;
        Swal.fire({
          icon: 'success',
          title: 'success !',
          timer: 1500,
          showConfirmButton: false,
        })
        $('#AddModal').modal('hide');
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: error.error.message,
          timer: 1500,
          showConfirmButton: false,
        })
        console.error('Error adding Team:', error);
      }
    );
  }

}
