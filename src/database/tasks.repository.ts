import fs from "fs";
import path from "path";
import { TaskDatabase } from "../models/task.database";
import { Tasks } from "../models/tasks";

export class TasksRepository {
  private caminho: string = path.dirname(__filename) + "/../data/tasks.json";

  public create(task: Tasks) {
    //add usuario no user.json
    const lista = this.list();
    lista.push({
      _id: task.id,
      _title: task.title,
      _description: task.description,
    });

    const data = JSON.stringify(lista);
    fs.writeFileSync(this.caminho, data);
  }

  public list(): TaskDatabase[] {
    //lista as tasks de tasks.json
    const data = fs.readFileSync(this.caminho);
    return JSON.parse(data.toString());
  }
}
