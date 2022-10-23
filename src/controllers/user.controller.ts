import { Request, Response } from "express";
import { userList } from "../data/users.list";
import { User } from "../models/user";

export class UserController {
  public list(req: Request, res: Response) {
    try {
      let users = userList;

      let usersListReturn = users.map((user) => {
        return user.getUser();
      });

      return res.status(200).send({
        ok: true,
        message: "Listando todos os usuários!",
        data: usersListReturn,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: "Instabilidade no servidor!",
        error: error.toString(),
      });
    }
  }

  public login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = userList.find(
        (user) => user.email == email && user.pass == password
      );

      if (!user) {
        return res.status(404).send({
          ok: false,
          message: "Usuário não encontrado!",
        });
      }

      return res.status(200).send({
        ok: true,
        message: "Usuário encontrado!",
        data: {
          id: user.id,
          email: user.email,
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

  public createUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      if (!name) {
        return res.status(400).send({
          ok: false,
          message: "Nome não inserido!",
        });
      }

      if (!email) {
        return res.status(400).send({
          ok: false,
          message: "Email não inserido!",
        });
      }

      if (!password) {
        return res.status(400).send({
          ok: false,
          message: "Senha não inserida!",
        });
      }

      const user = new User(name, email, password);
      userList.push(user);

      return res.status(201).send({
        ok: true,
        message: "Usuário registrado com sucesso!",
        id: user.id,
        email: user.email,
        password: user.pass,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
