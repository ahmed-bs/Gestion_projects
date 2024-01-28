import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

listProject: Project[] = []; 
newProject: Project = new Project();
  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getAllProjects();
  }



  addProject(): void {
    this.projectService.createProject(this.newProject).subscribe(
      data => {
        console.log('Project added successfully:', data);
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
        console.error('Error adding project:', error);
      }
    );
  }



  getAllProjects() {

    this.projectService.getAllProjects().subscribe(
      data => {
        this.listProject= data;
      },
      error => {
        console.error(error);
      }
    );
  }




}
