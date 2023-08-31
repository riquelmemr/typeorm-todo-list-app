import { Request, Response } from "express";
import { FindAllTasksUseCase } from "../../../usecases/task";

class FindAllTasksController {
  constructor(private findAllTasksUseCase: FindAllTasksUseCase) {}

  async execute(req: Request, res: Response) {
    const { userId } = req.params;
    const { done, archived, title, description } = req.query;
    
    const { statusCode, body } = await this.findAllTasksUseCase.execute(userId, {
      done: done !== undefined ? JSON.parse(done as string) : undefined,
      archived: archived !== undefined ? JSON.parse(archived as string) : undefined,
      title: title ? String(title) : undefined,
      description: description ? String(description) : undefined
    });

    return res.status(statusCode).json(body);
  }
}

export { FindAllTasksController };

