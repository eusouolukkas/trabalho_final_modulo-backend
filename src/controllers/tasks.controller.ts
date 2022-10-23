import { Request, Response } from "express";
import { userList } from "../data/users.list";
import { Tasks } from "../models/tasks";

export class TasksController {
  public listTask(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { title, description } = req.body;

      const user = userList.find((user) => user.id == userId);

      if (!user) {
        return res.status(404).send({
          ok: false,
          message: "Usuário não encontrado!",
        });
      }

      let listTasks = user.tasks || [];

      if (title) {
        listTasks = listTasks.filter((tasks) => tasks.title == title);
      }

      if (description) {
        listTasks = listTasks.filter(
          (tasks) => tasks.description == description
        );
      }

      return res.status(200).send({
        notes: listTasks.map((item) => {
          return {
            id: item.id,
            title: item.title,
            description: item.description,
          };
        }),
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: "Instabilidade no servidor!",
        error: error.toString(),
      });
    }
  }

  public updateTask(req: Request, res: Response) {
    try {
      const { userId, taskId } = req.params;
      const { title, description } = req.body;

      const user = userList.find((user) => user.id == userId);

      if (!user) {
        return res.status(404).send({
          ok: false,
          message: "Usuário não encontrado!",
        });
      }

      const tasks = user.tasks.find((task) => task.id === taskId);

      if (!tasks) {
        return res.status(404).send({
          ok: false,
          message: "Tarefa não encontrada!",
        });
      }

      tasks.title = title;
      tasks.description = description;

      return res.status(200).send({
        ok: true,
        message: "Tarefa atualizada com sucesso",
        data: {
          id: taskId,
          title: title,
          description: description,
        },
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: "Instabilidade no servidor!",
        error: error.toString(),
      });
    }
  }

  public createTask(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { title, description } = req.body;

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

      const user = userList.find((user) => user.id == userId);

      if (!user) {
        return res.status(404).send({
          ok: false,
          message: "Usuário não encontrado",
        });
      }

      user.tasks.push(task);

      return res.status(201).send({
        ok: true,
        message: "Tarefa criada com sucesso",
        data: {
          id: task.id,
          title: task.title,
          description: task.description,
        },
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: "Instabilidade no servidor!",
        error: error.toString(),
      });
    }
  }

  public deleteTask(req: Request, res: Response) {
    try {
      const { userId, taskId } = req.params;

      const user = userList.find((user) => user.id == userId);

      if (!user) {
        return res.status(404).send({
          ok: false,
          message: "Usuário não encontrado!",
        });
      }

      const task = user.tasks
        ? user.tasks.findIndex((task) => task.id == taskId)
        : -1;

      if (task < 0) {
        return res.status(404).send({
          ok: false,
          message: "Tarefa não encontrada!",
        });
      }

      user.tasks?.splice(task, 1);

      return res.status(200).send({
        ok: true,
        message: "Tarefa deletada com sucesso!",
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: "Instabilidade no servidor!",
        error: error.toString(),
      });
    }
  }
}
