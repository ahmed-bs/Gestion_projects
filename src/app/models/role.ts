import { User } from "./user";

export class Role {
  id!: number;
  roleName!: string;
  users!: User[];
}
