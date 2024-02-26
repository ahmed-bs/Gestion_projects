
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

import { ProjectTask } from '../models/project_tasks';
import { ProjectTasksService } from '../services/projectTasks.service';
import Swal from 'sweetalert2';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-project_tasks',
  templateUrl: './project_tasks.component.html',
  styleUrls: ['./project_tasks.component.css'],
})
export class Project_tasksComponent implements OnInit {
  listProjectTask: ProjectTask[] = []; 
  project!:Project;
  newProjectTask: ProjectTask = new ProjectTask();


  doing: ProjectTask[] = [];
  done: ProjectTask[] = [];
  todo: ProjectTask[] = [];


  projectId!:number
  ngOnInit() {
    this.projectId = parseInt(localStorage.getItem('projectId')!);
    this.getProjectById();
    this.getAllProjectTasks();

  }

  goBack(): void {
    // Navigate back to the previous route
    this.router.navigate(['../']);
  }

  constructor(private projectTaskService: ProjectTasksService,
    private projectService: ProjectService,
    private router: Router) { }




  drop(event: CdkDragDrop<ProjectTask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const movedTask = event.previousContainer.data[event.previousIndex] as ProjectTask;
      if ( "cdk-drop-list-1"==event.container.id) {
        movedTask.state='doing'
      }else if ("cdk-drop-list-0"==event.container.id) {
        movedTask.state='to do'
      }else{
        movedTask.state='done'
      }
      this.editTask(movedTask);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }


getProjectById(){
  this.projectService.getProjectById(this.projectId).subscribe(
    data => {
      this.project= data;
    },
    error => {
      console.error(error);
    }
  );
}


  

  categorizeTasks() {
    this.todo = this.listProjectTask.filter(task => task.state === 'to do');
    this.doing = this.listProjectTask.filter(task => task.state === 'doing');
    this.done = this.listProjectTask.filter(task => task.state === 'done');
  }

  getAllProjectTasks(){
    this.projectTaskService.getTasksByProjectId(this.projectId).subscribe(
      data => {
        this.listProjectTask= data;
        this.categorizeTasks();
      },
      error => {
        console.error(error);
      }
    );
  }





  addProjectTask(): void {
    
    this.newProjectTask.state='to do'
    this.newProjectTask.project = this.project;
    this.projectTaskService.createProjectTask(this.newProjectTask).subscribe(
      data => {
        console.log('Project added successfully:', data);
        this.getAllProjectTasks();
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
    this.newProjectTask= new ProjectTask();
  }
  openEditModel(newProjectTask:ProjectTask)
  {
    this.newProjectTask=newProjectTask;
  }
  

  editProjectTask(): void {
    this.newProjectTask.project = this.project;
    this.projectTaskService.updateProjectTask(this.newProjectTask).subscribe(data => {
      this.getAllProjectTasks();
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
    this.newProjectTask= new ProjectTask();
  }


  editTask(taskToEdit: ProjectTask): void {
    this.projectTaskService.updateProjectTask(taskToEdit).subscribe(
      data => {
        this.getAllProjectTasks();
      },
      error => {
        console.log("error:", error);
      }
    );
  }

  
  deleteTask(id:number): void {
    this.projectTaskService.deleteProjectTask(id).subscribe(
      data => {
        console.log('Project Deleted successfully:', data);
        Swal.fire({
          icon: 'success',
          title: 'Deleted !',
          timer: 1500,
          showConfirmButton: false,
        })
        this.getAllProjectTasks();
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

  viewTaskDetails(newProjectTask:ProjectTask): void{
    this.newProjectTask=newProjectTask;

    console.log("tttttt",newProjectTask);
    
  }




}
