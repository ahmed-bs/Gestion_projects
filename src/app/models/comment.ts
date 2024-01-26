import { Project } from "./project";
import { ProjectTask } from "./project_tasks";
import { User } from "./user";

export class Comment {
  id!: number;
  text!: string;
  user: User = new User;
  task: ProjectTask = new ProjectTask;
  project: Project = new Project;
}