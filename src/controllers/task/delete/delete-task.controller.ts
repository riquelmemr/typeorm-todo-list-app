import { Request, Response } from "express";
import { DeleteTaskUseCase } from "../../../usecases/task";

class DeleteTaskController {
  constructor(private deleteTaskUseCase: DeleteTaskUseCase) {}

  async execute(req: Request, res: Response) {
    const { id, userId } = req.params;
    const { statusCode, body } = await this.deleteTaskUseCase.execute({
      id,
      userId
    });
    
    return res.status(statusCode).json(body);
  }
}

export { DeleteTaskController };

