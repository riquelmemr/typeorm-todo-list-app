import { Request, Response } from "express";
import { FindOneTaskUseCase } from "../../../usecases/task/find-one/find-one-task.usecase";

class FindOneTaskController {
  constructor(private findOneTaskUseCase: FindOneTaskUseCase) {}

  async execute(req: Request, res: Response) {
    const { id } = req.params;
    const { userId } = req.params;

    const { statusCode, body } = await this.findOneTaskUseCase.execute(id, userId);

    return res.status(statusCode).json(body);
  }
}

export { FindOneTaskController };
