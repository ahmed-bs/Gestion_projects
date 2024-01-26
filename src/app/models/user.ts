// TypeScript class (user.model.ts)

import { Role } from "./role";
import { Team } from "./team";


export class User {
  id!: number;
  username!: string;
  password!: string;
  email!: string;
  firstName!: string;
  lastName!: string;
  dateOfBirth!: Date;
  team!: Team;
  roles!: Role[];

}
