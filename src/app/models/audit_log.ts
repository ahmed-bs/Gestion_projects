import { User } from "./user";

export class AuditLog {
  id!: number;
  user!: User;
  action!: string;
  timestamp!: Date;

}
