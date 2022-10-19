import { Request, Response } from "express";
import { UserRepository } from "../database/users.repository";
import { User } from "../models/user";

export class UserController {
  public list(req: Request, res: Response) {
    try {
      const list = new UserRepository().list();

      return res.status(200).send({
        ok: true,
        message: "Listing all users",
        data: list,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = new UserRepository()
        .list()
        .find((userItem) => userItem._email == email);

      if (!user) {
        return res.status(404).send({
          ok: false,
          message: "User is not found",
        });
      }

      if (user._pass !== password) {
        return res.status(400).send({
          ok: false,
          message: "Password is not found",
        });
      }

      return res.status(200).send({
        ok: true,
        data: user?._id,
      });
    } catch (error) {
      return res.status(500).send({
        ok: false,
        message: error?.toString(),
      });
    }
  }

  public createUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      if (!name) {
        return res.status(400).send({
          ok: false,
          message: "Name not provided",
        });
      }

      if (!email) {
        return res.status(400).send({
          ok: false,
          message: "Email not provided",
        });
      }

      if (!password) {
        return res.status(400).send({
          ok: false,
          message: "Password not provided",
        });
      }

      // CPF deve ser único por usuário.
      const repository = new UserRepository();
      let list = repository.list();

      const user = new User(name, email, password);

      repository.create(user);

      list = repository.list();

      return res.status(201).send({
        ok: true,
        message: "User successfully created",
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
