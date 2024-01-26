import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects(): void {
    this.projectService.getAllProjects().subscribe(
      data => {
        console.log(data); // Handle the data as needed
      },
      error => {
        console.error(error);
      }
    );
  }
}
