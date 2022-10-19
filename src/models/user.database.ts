import { Tasks } from "./tasks";

export interface UserDatabase {
  _id: string;
  _name: string;
  _email: string;
  _pass: number;
  _tasks: Tasks[];
}
