import { v4 as createUuid } from "uuid";

export class Tasks {
  private _id: string;

  constructor(private _title: string, private _description: string) {
    this._id = createUuid();
  }

  public get title() {
    return this._title;
  }

  public set title(title: string) {
    this._title = title;
  }

  public get description() {
    return this._description;
  }

  public set description(description: string) {
    this._description = description;
  }

  public get id() {
    return this._id;
  }

  public get tasks(): string[] {
    return this.tasks ?? [];
  }

  // Adapter
  public getTasks() {
    return {
      id: this._id,
      title: this._title,
      description: this._description,
      tasks: this.tasks,
    };
  }
}
