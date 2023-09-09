import { Request, Response } from "express";
import { ICreateUserRequestDTO } from "../../../usecases/user/create/create-user.dto";
import { CreateUserUseCase } from "../../../usecases/user/create/create-user.usecase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async execute(req: Request, res: Response) {
    const data: ICreateUserRequestDTO = req.body;
    const { statusCode, body } = await this.createUserUseCase.execute(data);

    return res.status(statusCode).json(body);
  }
}

export { CreateUserController };

