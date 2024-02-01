import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  listUser: User[] = [];
  newUser: User = new User();

  constructor( private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    this.userService.getAllUsers().subscribe(
      data=> {this.listUser = data;},
      error => {
        console.error(error);
      }
    )
  }

  addUser(): void {
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

  }



  openEditModel(user:User)
{
  this.newUser.id=user.id;
  this.newUser.username = user.username;
  this.newUser.firstName = user.firstName;
  this.newUser.lastName = user.lastName;
  this.newUser.dateOfBirth = user.dateOfBirth;
  this.newUser.email = user.email;

  this.newUser.password = user.password;
  
}

editUser(): void {
  this.userService.updateUser(this.newUser.id,this.newUser).subscribe(data => {
    this.getAllUser();
    Swal.fire({
      icon: 'success',
      title:'Modified !',
      timer: 1500,
      showConfirmButton: false,
    })
    $('#EditModal').modal('hide');
  },error=>{
    Swal.fire({
      icon: 'error',
      title: error.error.message,
      timer: 1500,
      showConfirmButton: false,
    })
  }) 
}


DeleteUser(id:number): void {
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
