import { Request, Response, Router } from "express";
import { TasksController } from "../controllers/tasks.controller";
import { UserController } from "../controllers/user.controller";
import { userValidator } from "../middlewares/user.exists";

const userRoutes = Router();

//GET
userRoutes.get("/", (req: Request, res: Response) =>
  new UserController().list(req, res)
);

// POST
userRoutes.post("/", [userValidator], (req: Request, res: Response) =>
  new UserController().createUser(req, res)
);

//GET LOGIN
userRoutes.post("/login", new UserController().login);

//---------------TasksRoutes--------------

userRoutes.get("/:userId", (req: Request, res: Response) =>
  new TasksController().listTask(req, res)
);

userRoutes.post("/:userId", (req: Request, res: Response) => {
  new TasksController().createTask(req, res);
});

userRoutes.put("/:userId/:taskId", (req: Request, res: Response) =>
  new TasksController().updateTask(req, res)
);

userRoutes.delete("/:userId/:taskId", (req: Request, res: Response) =>
  new TasksController().deleteTask(req, res)
);

/* userRoutes.get("/:userId/tasks/", (req: Request, res: Response) =>
  new TasksController().listAll(req, res)
); */

export { userRoutes };
