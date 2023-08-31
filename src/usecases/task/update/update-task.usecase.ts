import { HttpResponse } from "../../../helpers/http-response";
import { TaskRepository } from "../../../repositories/task/task.repository";
import { IUpdateTaskRequestDTO } from "./update-task.dto";

class UpdateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(userId: string, data: IUpdateTaskRequestDTO) {
    try {
      const { id, title, description, done, archived } = data;

      const task = await this.taskRepository.getById(id);
  
      if (!task || task.userId !== userId) {
        throw new Error("Tarefa não encontrada para este usuário.");
      }
  
      const taskUpdated = await this.taskRepository.update(id, {
        title: title || task.title,
        description: description || task.description,
        done: done !== undefined ? done : task.done,
        archived: archived !== undefined ? archived : task.archived
      });

      if (!taskUpdated) {
        throw new Error("Ocorreu um erro ao atualizar a tarefa.");
      }

      return HttpResponse.ok({
        success: true,
        status: "Tarefa editada com sucesso!",
        body: taskUpdated
      })
    } catch (error: any) {
      return HttpResponse.badRequest(error);
    }
  }
}

export { UpdateTaskUseCase };

