import cors from "cors";
import "dotenv/config";
import express from "express";
import 'reflect-metadata';
import TypeORMProvider from "./database/pg-helper";
import { TaskRepository } from "./repositories/task/task.repository";
import { UserRepository } from "./repositories/user/user.repository";
import { taskRoutes } from "./usecases/task/routes";
import { userRoutes } from "./usecases/user/routes";

export const userRepository = new UserRepository();
export const taskRepository = new TaskRepository();

export async function bootstrap(): Promise<express.Application> {
  const app = express();
  const port = process.env.PORT || 8080
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  app.use(userRoutes);
  app.use(taskRoutes);

  await TypeORMProvider.connect();
    
  app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });

  return app;
}

export const app = bootstrap();
