import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Team } from '../models/team';
import { TeamService } from '../services/team.service';
declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  listUser: User[] = [];
  newUser: User = new User();
  newTeam!:number;
  teamList!:Team[];

  constructor(private userService: UserService,private teamService:TeamService) { }

  ngOnInit(): void {
    this.getAllUser();
    this.getAllTeam();
  }

  getAllUser() {
    this.userService.getAllUsers().subscribe(
      data => { 
        console.log(data)
        this.listUser = data; },
      error => {
        console.error(error);
      }
    )
  }
  getAllTeam() {
    this.teamService.getAllTeams().subscribe(
      data => { this.teamList = data; },
      error => {
        console.error(error);
      }
    )
  }
getTeamById(){
  console.log("this.newUser",this.newUser);
  this.teamService.getOneTeamById(this.newTeam).subscribe(
    data => {
       this.newUser.team = data; },
    error => {
      console.error(error);
    }
  )
}


  addUser(): void {
    console.log("this.newUser",this.newUser);
    
    this.userService.createUser(this.newUser).subscribe(
      data => {
        console.log('User Added succesfully:', data);
        this.getAllUser();
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
        console.error('Error adding User:', error);
      }
    );
    this.newUser = new User();
  }



  openEditModel(user: User) {
    this.newUser.id = user.id;
    this.newUser.username = user.username;
    this.newUser.firstName = user.firstName;
    this.newUser.lastName = user.lastName;
    this.newUser.dateOfBirth = user.dateOfBirth;
    this.newUser.email = user.email;
    this.newUser.password = user.password;
  }

  editUser(): void {
    this.userService.updateUser(this.newUser.id, this.newUser).subscribe(data => {
      this.getAllUser();
      Swal.fire({
        icon: 'success',
        title: 'Modified !',
        timer: 1500,
        showConfirmButton: false,
      })
      $('#EditModal').modal('hide');
    }, error => {
      Swal.fire({
        icon: 'error',
        title: error.error.message,
        timer: 1500,
        showConfirmButton: false,
      })
    })
    this.newUser = new User();

  }


  DeleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(
      data => {
        console.log('User Deleted successfully:', data);
        Swal.fire({
          icon: 'success',
          title: 'Deleted !',
          timer: 1500,
          showConfirmButton: false,
        })
        this.listUser = this.listUser.filter(user => user.id !== id);
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: error.error.message,
          timer: 1500,
          showConfirmButton: false,
        })
        console.error('Error Deleting user:', error);
      }
    );
  }

}
