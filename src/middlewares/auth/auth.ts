import { NextFunction, Request, Response } from "express";
import { userRepository } from "../../main";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params;

    const userFound = await userRepository.getById(userId);
  
    if (!userFound) {
      return res.status(400).json({ error: "Realize o login ou crie sua conta para realizar essa operação." });
    }
  
    next();
  } catch (error: any) {
    return res.status(400).json({ error: "O seu ID enviado não é do formato esperado. Realize o login novamente!" });
  } 
}