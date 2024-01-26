import { Project } from "./project";
import { ProjectTask } from "./project_tasks";

export class Attachment {
  id!: number;
  filename!: string;
  description!: string;
  task!: ProjectTask;
  project!: Project;
}
