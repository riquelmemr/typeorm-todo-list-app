import { HttpResponse, IHttpResponse } from "../../../helpers/http-response";
import { TaskRepository } from "../../../repositories/task/task.repository";

class FindOneTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(id: string, userId: string): Promise<IHttpResponse> {
    try {
      const task = await this.taskRepository.getById(id);

      if (!task || task.UserId !== userId) {
        throw new Error("Tarefa não encontrada!");
      }

      return HttpResponse.ok({
        success: true,
        status: "Tarefa encontrada!",
        body: task,
      });
    } catch (error: any) {
      return HttpResponse.badRequest(error);
    }
  }
}

export { FindOneTaskUseCase };

