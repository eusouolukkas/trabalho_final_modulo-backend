import { v4 as createUuid } from "uuid";
import { Tasks } from "./tasks";

export class User {
  private _id: string;
  private _tasks: Tasks[];

  constructor(
    private _name: string,
    private _email: string,
    private _pass: number
  ) {
    this._id = createUuid();
    this._tasks = this._tasks ?? [];
  }

  public get name() {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get email() {
    return this._email;
  }

  public set email(email: string) {
    this._email = email;
  }

  public get pass() {
    return this._pass;
  }

  public set pass(pass: number) {
    this._pass = pass;
  }

  public get id() {
    return this._id;
  }

  public get tasks(): Tasks[] {
    return this._tasks ?? [];
  }

  // Adapter
  public getUser() {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      pass: this._pass,
      tasks: this._tasks,
    };
  }
}
