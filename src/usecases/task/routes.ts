import { Router } from "express";
import { CreateTaskUseCase, DeleteTaskUseCase, FindAllTasksUseCase, UpdateTaskUseCase } from ".";
import { CreateTaskController, DeleteTaskController, FindAllTasksController, UpdateTaskController } from "../../controllers/task";
import { taskRepository } from "../../main";
import { createTaskValidation, updateTaskValidation } from "../../middlewares";
import { authMiddleware } from "../../middlewares/auth/auth";

export const taskRoutes = Router();

taskRoutes.post('/task/:userId/create', authMiddleware, createTaskValidation, (req, res) => {
  const createTaskUseCase = new CreateTaskUseCase(taskRepository);
  const createTaskController = new CreateTaskController(createTaskUseCase);
  return createTaskController.execute(req, res);
})

taskRoutes.delete('/task/:userId/delete/:id', authMiddleware, (req, res) => {
  const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
  const deleteTaskController = new DeleteTaskController(deleteTaskUseCase);
  return deleteTaskController.execute(req, res);
})

taskRoutes.get('/task/:userId', authMiddleware, (req, res) => {
  const findAllTasksUseCase = new FindAllTasksUseCase(taskRepository);
  const findAllTasksController = new FindAllTasksController(findAllTasksUseCase);
  return findAllTasksController.execute(req, res);
})

taskRoutes.put('/task/:userId/update/:id', authMiddleware, updateTaskValidation, (req, res) => {
  const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
  const updateTaskController = new UpdateTaskController(updateTaskUseCase);
  return updateTaskController.execute(req, res);
})