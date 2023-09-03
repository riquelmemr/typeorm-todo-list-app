import { UserEntity } from "../../database/entities/user.entity";
import User from "../../models/user.model";
import { BaseRepository } from "../base-repository";

class UserRepository extends BaseRepository<UserEntity, User> {
  constructor() {
    super();
    this.entityClass = UserEntity;
  }

  mapToModel(item: UserEntity): User {
    return new User(
      item.id,
      item.name,
      item.email,
      item.password,
      item.createdAt
    );
  }
}

export { UserRepository };

