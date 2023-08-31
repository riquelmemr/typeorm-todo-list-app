import { FindOptionsWhere, ILike } from "typeorm";
import { TaskEntity } from "../../database/entities/task.entity";
import { IFindAllTasksFilterDTO } from "../../usecases/task/find-all/find-all-tasks.dto";
import { BaseRepository } from "../base-repository";

class TaskRepository extends BaseRepository<TaskEntity> {
  constructor() {
    super();
    this.entityClass = TaskEntity;
  }

  async getAllByUserId(userId: string, filters: IFindAllTasksFilterDTO): Promise<TaskEntity[]> {
    const { done, archived, title, description } = filters;
    const repository = this.getRepository();
    const options: FindOptionsWhere<TaskEntity> = { userId: userId };

    if (done !== undefined) {
      options.done = done;      
    }

    if (archived !== undefined) {
      options.archived = archived;
    }

    if (title) {
      options.title = ILike(`%${title}%`);
    }

    if (description) {
      options.description = ILike(`%${description}%`);
    }

    const tasks = await repository.find({ where: options });
    return tasks;
  }
}

export { TaskRepository };

