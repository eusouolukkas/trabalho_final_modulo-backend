import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../database/users.repository";

export const userValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const user = UserRepository.some((user) => user.id == id);

  if (!user) {
    return res.status(400).send({
      ok: false,
      message: "User is not found!",
    });
  }

  next();
};
