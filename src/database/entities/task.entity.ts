import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({ name: "tasks" })
export class TaskEntity {
  @PrimaryColumn()
  id!: number;

  @Column({ type: "varchar" })
  title!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ name: "user_id", type: "uuid" })
  userId!: string;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  @JoinColumn({ 
    name: "user_id", 
    referencedColumnName: "id", 
    foreignKeyConstraintName: "fk_tasks_user" 
  })
  user!: UserEntity;

  @Column({ type: "boolean", default: false })
  done!: boolean;

  @Column({ type: "boolean", default: false })
  archived!: boolean;

  @Column({ name: "created_at", type: "timestamp" })
  createdAt!: Date;

  // @Column({ name: "updated_at", type: "timestamp" })
  // updatedAt!: Date;

  @BeforeInsert()
  beforeInsert() {
    this.createdAt = new Date();
    // this.updatedAt = new Date();
  }
}
