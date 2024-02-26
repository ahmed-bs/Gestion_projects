import { Project } from "./project";
import { User } from "./user";

export class ProjectTask {
  id!: number;
  title!: string;
  description!: string;
  dueDate!: Date;
  state!: string;
  project?: Project;
  user?: User;

}
