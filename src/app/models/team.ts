import { User } from "./user";

export class Team {
    id!: number;
    teamName!: string;
    description!: string;
    users!: User[];
  }