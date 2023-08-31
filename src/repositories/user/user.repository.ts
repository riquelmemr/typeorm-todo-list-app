import { UserEntity } from "../../database/entities/user.entity";
import { BaseRepository } from "../base-repository";

class UserRepository extends BaseRepository<UserEntity> {
  constructor() {
    super();
    this.entityClass = UserEntity;
  }
}

export { UserRepository };

