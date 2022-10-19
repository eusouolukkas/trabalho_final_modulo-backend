import { Request, Response } from "express";
import { tasksList } from "../data/task.list";
import { userList } from "../data/users.list";
import { TasksRepository } from "../database/tasks.repository";
import { UserRepository } from "../database/users.repository";
import { Tasks } from "../models/tasks";

export class TransactionsController {
  public listTask(userId?: string) {
    let lista = new UserRepository().list();

    if (userId) {
      lista.filter((item) => item._id === userId);
    }

    let listaRetorno = lista.map((user) => {
      return user._tasks;
    });

    return listaRetorno;
  }

  public updateTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description } = req.body;

      const tasks = tasksList.find((task) => task.id === id);

      if (tasks) {
        tasks.title = title;
        tasks.description = description;
      }

      return res.send({
        id: id,
        title: title,
        description: description,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public createTask(req: Request, res: Response) {
    try {
      const { title, description } = req.body;
      const { userId } = req.params;

      if (!title) {
        return res.status(400).send({
          ok: false,
          message: "Title not provided",
        });
      }

      if (!description) {
        return res.status(400).send({
          ok: false,
          message: "Description not provided",
        });
      }

      const task = new Tasks(title, description);

      const user = new UserRepository()
        .list()
        .find((user) => user._id === userId);

      if (!user) {
        return res.status(404).send({
          ok: false,
          message: "User is not found",
        });
      }

      user._tasks.push(task);

      return res.status(201).send({
        ok: true,
        message: "Task successfully created",
        data: {
          title: task.title,
          description: task.description,
          id: task.id,
        },
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public deleteTask(req: Request, res: Response) {
    try {
      const { id } = req.params;

      let task = tasksList.findIndex((item) => item.id === id);

      if (task < 0) {
        return res.status(404).send({
          ok: false,
          message: "Task is not found",
        });
      }

      tasksList.splice(task, 1);

      return res.status(200).send({
        ok: true,
        message: "Task successfully deleted",
        data: tasksList,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        error: error.toString(),
      });
    }
  }

  public listAll(req: Request, res: Response) {
    try {
      const list = new TasksRepository().list();

      return res.status(200).send({
        ok: true,
        message: "Listing all tasks",
        data: list,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
