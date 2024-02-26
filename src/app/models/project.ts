import { Team } from "./team";

export class Project {
    id!: number;
    projectName!: string;
    description!: string;
    team?: Team; 
  
  }