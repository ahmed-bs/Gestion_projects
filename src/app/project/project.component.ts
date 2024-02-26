import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Team } from '../models/team';
import { TeamService } from '../services/team.service';
declare var $: any;
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
teamsList: Team[] = [];
listProject: Project[] = []; 
newProject: Project = new Project();
newTeam!: number;
  constructor(private projectService: ProjectService,private teamService: TeamService,
    private router: Router) {}

  ngOnInit(): void {
    this.getAllProjects();
    this.getAllTeams();
  }

  getTeamById(){
    this.teamService.getOneTeamById(this.newTeam).subscribe(   data => {
      this.newProject.team  = data;
    },
    error => {
      console.error(error);
    }
  )
  }

  async addProject(): Promise<void> {
    console.log("this.newProject.",this.newProject);
    
    this.projectService.createProject(this.newProject).subscribe(
      data => {
        console.log('Project added successfully:', data);
        this.getAllProjects();;
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
    this.newProject = new Project();
  }
  getAllTeams() {
    this.teamService.getAllTeams().subscribe(
      data => {
        this.teamsList = data;
      },
      error => {
        console.error(error);
      }
    )
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

openEditModel(project:Project)
{
  this.newProject.id=project.id;
  this.newProject.projectName = project.projectName;
  this.newProject.description = project.description;
  this.newProject.team = project.team;
}



  editProject(): void {
    this.projectService.updateProject(this.newProject).subscribe(data => {
      this.getAllProjects();
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
    this.newProject = new Project();
  }

  viewTaskDetails(project: Project): void {
    const projectId = project.id;
    localStorage.setItem('projectId', projectId.toString());
    this.router.navigate(['/tasks']);
  }


  DeleteProject(id:number): void {
    this.projectService.deleteProject(id).subscribe(
      data => {
        console.log('Project Deleted successfully:', data);
        Swal.fire({
          icon: 'success',
          title: 'Deleted !',
          timer: 1500,
          showConfirmButton: false,
        })
        this.listProject = this.listProject.filter(project => project.id !== id);
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: error.error.message,
          timer: 1500,
          showConfirmButton: false,
        })
        console.error('Error Deleting project:', error);
      }
    );
  }

}
