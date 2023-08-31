import { HttpResponse, IHttpResponse } from "../../../helpers/http-response";
import { TaskRepository } from "../../../repositories/task/task.repository";
import { ICreateTaskRequestDTO } from "./create-task.dto";

class CreateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(data: ICreateTaskRequestDTO): Promise<IHttpResponse> {
    try {
      const { title, description, userId } = data;
  
      const task = this.taskRepository.createEntityInstance({
        title,
        description,
        userId
      });
      this.taskRepository.create(task);
  
      return HttpResponse.created({
        success: true,
        status: "Tarefa criada com sucesso!",
        body: task
      });
    } catch (error: any) {
      return HttpResponse.badRequest(error);
    }
  }
}

export { CreateTaskUseCase };

