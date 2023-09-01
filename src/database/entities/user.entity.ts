import { randomUUID } from "crypto";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { TaskEntity } from "./task.entity";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ type: "varchar", unique: true, nullable: true })
  name!: string;

  @Column({ type: "varchar", unique: true, nullable: true })
  email!: string;

  @Column({ type: "varchar", nullable: true })
  password!: string;

  @Column({ name: "created_at", type: "timestamp" })
  createdAt!: Date;

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks!: TaskEntity[];

  @BeforeInsert()
  beforeInsert() {
    this.id = randomUUID();
    this.createdAt = new Date();
  }
}
