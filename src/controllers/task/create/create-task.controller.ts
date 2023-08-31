import { Request, Response } from "express";
import { CreateTaskUseCase } from "../../../usecases/task";
import { ICreateTaskRequestDTO } from "../../../usecases/task/create/create-task.dto";

class CreateTaskController {
  constructor(private createTaskUseCase: CreateTaskUseCase) {}

  async execute(req: Request, res: Response) {
    const { userId } = req.params;
    const data: ICreateTaskRequestDTO = req.body;
    
    const { statusCode, body } = await this.createTaskUseCase.execute({
      ...data,
      userId
    });

    return res.status(statusCode).json(body);
  }
}

export { CreateTaskController };

