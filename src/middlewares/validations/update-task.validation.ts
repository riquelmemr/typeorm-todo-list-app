import { NextFunction, Request, Response } from "express";

function updateTaskValidation(req: Request, res: Response, next: NextFunction) {
  const { title, description, done, archived } = req.body;

  if (!title && !description && done === undefined && archived === undefined) {
    return res.status(400).json({ error: "É necessário informar ao menos um campo para atualizar." });
  }

  if (done !== undefined) {
    if (typeof JSON.parse(done) !== "boolean") {
      return res.status(400).json({ error: "O campo 'done' está inválido." });
    }

    req.body.done = JSON.parse(done);
  }

  if (archived !== undefined) {
    if (typeof JSON.parse(archived) !== "boolean") {
      return res.status(400).json({ error: "O campo 'archived' está inválido." });
    }

    req.body.archived = JSON.parse(archived);
  }

  next();
}

export { updateTaskValidation };

 