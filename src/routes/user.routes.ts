import { Request, Response, Router } from "express";
import { TransactionsController } from "../controllers/transactions.controller";
import { UserController } from "../controllers/user.controller";
import { logGetMiddleware } from "../middlewares/get.middlewares";
import { logMiddleware } from "../middlewares/log.middlewares";
import { userValidator } from "../middlewares/user.exists";

const userRoutes = Router();

userRoutes.use(logMiddleware);

//GET
userRoutes.get("/", [logGetMiddleware], (req: Request, res: Response) =>
  new UserController().list(req, res)
);

// POST
userRoutes.post("/", (req: Request, res: Response) =>
  new UserController().createUser(req, res)
);

userRoutes.post("/login", new UserController().login);

//---------------TasksRoutes--------------

userRoutes.get("/:userId/tasks/:id", (req: Request, res: Response) =>
  new TransactionsController().listTask()
);

userRoutes.post("/:userId/tasks", (req: Request, res: Response) => {
  new TransactionsController().createTask(req, res);
});

userRoutes.put("/:userId/tasks/:id", (req: Request, res: Response) =>
  new TransactionsController().updateTask(req, res)
);

userRoutes.delete("/:userId/tasks/:id", (req: Request, res: Response) =>
  new TransactionsController().deleteTask(req, res)
);

userRoutes.get("/:userId/tasks/", (req: Request, res: Response) =>
  new TransactionsController().listAll(req, res)
);

export { userRoutes };
