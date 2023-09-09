import { Router } from "express";
import {
  CreateTaskUseCase,
  DeleteTaskUseCase,
  FindAllTasksUseCase,
  UpdateTaskUseCase,
} from ".";
import {
  CreateTaskController,
  DeleteTaskController,
  FindAllTasksController,
  UpdateTaskController,
} from "../../controllers/task";
import { FindOneTaskController } from "../../controllers/task/find-one/find-one-task.controller";
import { taskRepository } from "../../main";
import {
  createTaskValidation,
  finishedDateValidation,
  updateTaskValidation,
} from "../../middlewares";
import { authMiddleware } from "../../middlewares/auth/auth";
import { FindOneTaskUseCase } from "./find-one/find-one-task.usecase";

export const taskRoutes = Router();

taskRoutes.post(
  "/task/:userId/create",
  authMiddleware,
  createTaskValidation,
  finishedDateValidation,
  (req, res) => {
    const createTaskUseCase = new CreateTaskUseCase(taskRepository);
    const createTaskController = new CreateTaskController(createTaskUseCase);
    return createTaskController.execute(req, res);
  }
);

taskRoutes.delete("/task/:userId/delete/:id", authMiddleware, (req, res) => {
  const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
  const deleteTaskController = new DeleteTaskController(deleteTaskUseCase);
  return deleteTaskController.execute(req, res);
});

taskRoutes.get("/task/:userId", authMiddleware, (req, res) => {
  const findAllTasksUseCase = new FindAllTasksUseCase(taskRepository);
  const findAllTasksController = new FindAllTasksController(
    findAllTasksUseCase
  );
  return findAllTasksController.execute(req, res);
});

taskRoutes.put(
  "/task/:userId/update/:id",
  authMiddleware,
  updateTaskValidation,
  finishedDateValidation,
  (req, res) => {
    const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
    const updateTaskController = new UpdateTaskController(updateTaskUseCase);
    return updateTaskController.execute(req, res);
  }
);

taskRoutes.get("/task/:userId/:id", authMiddleware, (req, res) => {
  const findOneTaskUseCase = new FindOneTaskUseCase(taskRepository);
  const findOneTaskController = new FindOneTaskController(findOneTaskUseCase);
  return findOneTaskController.execute(req, res);
});
