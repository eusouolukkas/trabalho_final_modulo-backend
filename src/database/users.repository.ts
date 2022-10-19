import fs from "fs";
import path from "path";
import { User } from "../models/user";
import { UserDatabase } from "../models/user.database";

export class UserRepository {
  private caminho: string = path.dirname(__filename) + "/../data/users.json";

  public create(user: User) {
    //add usuario no user.json
    const lista = this.list();
    lista.push({
      _id: user.id,
      _name: user.name,
      _email: user.email,
      _pass: user.pass,
      _tasks: user.tasks,
    });

    const data = JSON.stringify(lista);
    fs.writeFileSync(this.caminho, data);
  }

  public list(): UserDatabase[] {
    //lista os usuarios de users.json
    const data = fs.readFileSync(this.caminho);
    return JSON.parse(data.toString());
  }
}
