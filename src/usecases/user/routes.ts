import { Router } from "express";
import { CreateUserUseCase, LoginUserUseCase } from ".";
import { CreateUserController, LoginUserController } from "../../controllers/user";
import { userRepository } from "../../main";
import { createUserValidation, loginUserValidation } from "../../middlewares";

export const userRoutes = Router();

userRoutes.post("/user/create", createUserValidation, (req, res) => {
  const createUserUseCase = new CreateUserUseCase(userRepository);
  const createUserController = new CreateUserController(createUserUseCase);
  return createUserController.execute(req, res)
})

userRoutes.post('/user/login', loginUserValidation, (req, res) => {
  const loginUserUseCase = new LoginUserUseCase(userRepository);
  const loginUserController = new LoginUserController(loginUserUseCase);
  return loginUserController.execute(req, res)
})