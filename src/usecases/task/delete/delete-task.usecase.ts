import { HttpResponse, IHttpResponse } from "../../../helpers/http-response";
import { TaskRepository } from "../../../repositories/task/task.repository";
import { IDeleteTaskRequestDTO } from "./delete-task.dto";

class DeleteTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(data: IDeleteTaskRequestDTO): Promise<IHttpResponse> {
    try {
      const { id, userId } = data;

      const task = await this.taskRepository.getById(id);

      if (!task || task.UserId !== userId) {
        throw new Error("Tarefa não encontrada para este usuário.");
      }

      this.taskRepository.delete("id", id);

      return HttpResponse.ok({
        success: true,
        status: "Tarefa deletada com sucesso!",
        body: task,
      });
    } catch (error: any) {
      return HttpResponse.badRequest(error);
    }
  }
}

export { DeleteTaskUseCase };

