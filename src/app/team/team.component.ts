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
  newTeam: Team = new Team();

  constructor( private teamService: TeamService,private userService: UserService) { 
    this.list = 
    [
      {name :'India',checked : false},
      {name :'US',checked : false},
      {name :'China',checked : false},
      {name :'France',checked : false}
    ]
  }

  ngOnInit() {
    this.getAllTeams();
    this.getAllUser();
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
    this.newTeam
    console.log("this is wurt : ",this.newTeam)
    // this.teamService.createTeam(this.newTeam).subscribe(
    //   data => {
    //     console.log('Team added successfully:', data);
    //     this.getAllTeams();;
    //     Swal.fire({
    //       icon: 'success',
    //       title: 'success !',
    //       timer: 1500,
    //       showConfirmButton: false,
    //     })
    //     $('#AddModal').modal('hide');
    //   },
    //   error => {
    //     Swal.fire({
    //       icon: 'error',
    //       title: error.error.message,
    //       timer: 1500,
    //       showConfirmButton: false,
    //     })
    //     console.error('Error adding Team:', error);
    //   }
    // );
  }
  list! : any[];
  

  shareCheckedList(item:any[]){
    console.log(item);
  }
  shareIndividualCheckedList(item:{}){
    console.log(item);
  }

}
