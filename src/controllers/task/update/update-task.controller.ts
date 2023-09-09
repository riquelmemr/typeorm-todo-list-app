import { Request, Response } from "express";
import { UpdateTaskUseCase } from "../../../usecases/task/update/update-task.usecase";

class UpdateTaskController {
  constructor(private updateTaskUseCase: UpdateTaskUseCase) {}

  async execute(req: Request, res: Response) {
    const { title, description, done, archived, finishedDate } = req.body;
    const { userId, id } = req.params;

    const { statusCode, body } = await this.updateTaskUseCase.execute(userId, {
      id,
      title,
      description,
      done,
      archived,
      finishedDate: finishedDate || null,
    });

    return res.status(statusCode).json(body);
  }
}

export { UpdateTaskController };

