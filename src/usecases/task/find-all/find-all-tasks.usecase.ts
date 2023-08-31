import { HttpResponse, IHttpResponse } from "../../../helpers/http-response";
import { TaskRepository } from "../../../repositories/task/task.repository";
import { IFindAllTasksFilterDTO } from "./find-all-tasks.dto";

class FindAllTasksUseCase {
  constructor(private taskRepository: TaskRepository) {}
  
  async execute(userId: string, filters: IFindAllTasksFilterDTO): Promise<IHttpResponse> {
    try {
      const tasks = await this.taskRepository.getAllByUserId(userId, filters);
  
      return HttpResponse.ok({
        success: true,
        status: tasks.length > 0 ? "Tarefas encontradas com sucesso!" : "Nenhuma tarefa cadastrada ou encontrada.",
        body: tasks
      })
    } catch (error: any) {
      return HttpResponse.badRequest(error);
    }
  }
}

export { FindAllTasksUseCase };

