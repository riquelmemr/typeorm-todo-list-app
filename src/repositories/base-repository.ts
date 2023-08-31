import { DeepPartial, EntityTarget, FindOptionsWhere, ObjectLiteral, Repository } from "typeorm";
import TypeORMProvider from "../database/pg-helper";
import { IBaseRepository } from "./base-repository.interface";

abstract class BaseRepository<T extends ObjectLiteral> implements IBaseRepository<T> {
  protected entityClass!: EntityTarget<T>;

  protected getRepository(): Repository<T> {
    return TypeORMProvider.client.getRepository(this.entityClass);
  }

  async create(item: T): Promise<T> {
    const repository = this.getRepository();
    const result = await repository.save(item);
    return result;
  }

  async getById(id: string): Promise<T | null> {
    const repository = this.getRepository();
    return await repository.findOne({ where: { ["id" as keyof T]: id } as FindOptionsWhere<T> });
  }

  async getByOne(key: string, value: string): Promise<T | null> {
    const repository = this.getRepository();
    const item = await repository.findOne({ where: { [key]: value } as FindOptionsWhere<T> });
    return item;
  }

  async update(id: string, item: any): Promise<T | null> {
    const repository = this.getRepository();
    const result = await repository.update(id, item);

    if (result.affected === 0) {
      return null;
    }

    const updatedItem = await repository.findOne({ where: { ["id" as keyof T]: id } as FindOptionsWhere<T> });
    return updatedItem;
  }

  async delete(key: string, value: string): Promise<void> {
    const repository = this.getRepository();
    const result = await repository.delete({ [key]: value } as FindOptionsWhere<T>);

    if (result.affected === 0) {
      throw new Error("Ocorreu um erro ao deletar este item.");
    }
  }

  public createEntityInstance(item: DeepPartial<T>): T {
    return TypeORMProvider.client.manager.create(this.entityClass, item);
  }
}

export { BaseRepository };

